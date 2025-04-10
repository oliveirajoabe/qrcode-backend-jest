import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @Post()
  createUrl(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get('/all')
  getAll() {
    return this.urlService.getAll();
  }
  @Get('/all/:userId')
  getAllUserId(@Param('userId') userId: string) {
    return this.urlService.getAllToUserId(userId);
  }

  @Get(':hash')
  getUrl(@Param('hash') hash: string) {
    return this.urlService.getUrl(hash);
  }

  @Patch('/:id/:userId')
  updateUrl(
    @Body() updateUrlDto: UpdateUrlDto,
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.urlService.update(updateUrlDto, id, userId);
  }

  @Get('/redirect/:hash')
  getUrlToRedirect(@Param('hash') hash: string) {
    return this.urlService.getUrlRedirect(hash);
  }
}
