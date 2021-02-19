import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../database/entities/article.entity';

export class UpdateArticleDto {
  @ApiProperty({ description: 'project name', example: 'ThePij' })
  idUser: string;

  article: Article
}
