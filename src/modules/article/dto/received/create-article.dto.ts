import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ArticleDto } from '../../../database/dto/article.dto';

export class CreateArticleDto {
  @ApiProperty({ description: 'new article entity', type: () => ArticleDto })
  @IsNotEmpty()
  article: ArticleDto
}
