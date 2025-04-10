import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  shortedUrl?: string;

  @IsNumber()
  @IsOptional()
  clicks?: number;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  expireAt?: string;
}
