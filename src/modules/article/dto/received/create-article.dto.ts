import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleDto } from '../../../database/dto/article.dto';

export class CreateArticleDto {
  @ApiProperty({ description: 'new article entity', example: ArticleDto })
  @IsNotEmpty()
  @IsArray()
  @Type(() => ArticleDto)
  article: ArticleDto
}
