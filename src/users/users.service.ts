import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await this.hashingService.hash(
        createUserDto.password,
      );

      const user = await this.prisma.user.create({
        data: { ...createUserDto, password: passwordHash },
        select: {
          id: true,
          fullName: true,
          nickname: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          urls: true,
        },
      });

      return user;
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
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          fullName: true,
          nickname: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          urls: true,
        },
      });
      return users;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao listar os usuários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      const userUpdated = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          fullName: true,
          nickname: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          urls: true,
        },
      });

      return userUpdated;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Falha ao atualizar o usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
