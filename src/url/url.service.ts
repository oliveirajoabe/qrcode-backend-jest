import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { nanoid } from 'nanoid';
import { UpdateUrlDto } from './dto/update-url.dto';
import { getTomorrowISO } from 'src/utils/getTomorrowISO';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async create(createUrlDto: CreateUrlDto) {
    try {
      const hash = nanoid(8);

      const url = await this.prisma.url.create({
        data: {
          ...createUrlDto,
          shortedUrl: hash,
          expireAt: getTomorrowISO(),
        },
        select: {
          title: true,
          url: true,
          clicks: true,
          createdAt: true,
          shortedUrl: true,
          userId: true,
          description: true,
          expireAt: true,
        },
      });
      return url;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao cadastrar o usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll() {
    try {
      const urls = await this.prisma.url.findMany();
      return urls;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao listar os usuários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAllToUserId(userId: string) {
    try {
      const urls = await this.prisma.url.findMany({
        where: { userId },
        select: {
          title: true,
          url: true,
          clicks: true,
          createdAt: true,
          shortedUrl: true,
          userId: true,
          description: true,
          expireAt: true,
        },
      });
      return urls;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao listar os usuários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUrl(hash: string) {
    try {
      const dateNow = new Date();

      const url = await this.prisma.url.findFirst({
        where: { shortedUrl: hash },
        select: {
          id: true,
          title: true,
          url: true,
          clicks: true,
          createdAt: true,
          shortedUrl: true,
          userId: true,
          description: true,
          expireAt: true,
        },
      });

      if (!url) {
        throw new HttpException('Url não encontrado', HttpStatus.NOT_FOUND);
      }

      if (url.expireAt < dateNow) {
        throw new HttpException('Url expirada', HttpStatus.NOT_FOUND);
      }

      await this.prisma.url.update({
        where: { id: url.id },
        data: {
          clicks: url.clicks! + 1,
        },
      });

      return {
        title: url.title,
        url: url.url,
        clicks: url.clicks,
        createdAt: url.createdAt,
        shortedUrl: url.shortedUrl,
        userId: url.userId,
        description: url.description,
        expireAt: url.expireAt,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);
      throw new HttpException(
        'Falha ao buscar a url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(updateUrlDto: UpdateUrlDto, id: string, userId: string) {
    try {
      const url = await this.prisma.url.findFirst({
        where: { id: id, userId: userId },
      });

      if (!url) {
        throw new HttpException('Url não encontrado', HttpStatus.NOT_FOUND);
      }

      const urlUpdated = await this.prisma.url.update({
        where: { id },
        data: {
          title: updateUrlDto.title ? updateUrlDto.title : url.title,
          description: updateUrlDto.description
            ? updateUrlDto.description
            : url.description,
        },
        select: {
          title: true,
          url: true,
          clicks: true,
          createdAt: true,
          shortedUrl: true,
          userId: true,
          description: true,
          expireAt: true,
        },
      });
      return urlUpdated;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao atualizar a url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUrlRedirect(hash: string) {
    try {
      const url = await this.prisma.url.findFirst({
        where: { shortedUrl: hash },
      });

      if (!url) {
        throw new HttpException('Url não encontrado', HttpStatus.NOT_FOUND);
      }

      const newUrl = await this.prisma.url.update({
        where: { id: url.id },
        data: {
          clicks: url.clicks! + 1,
        },
        select: {
          url: true,
          shortedUrl: true,
          clicks: true,
        },
      });

      return newUrl;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao buscar a url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
