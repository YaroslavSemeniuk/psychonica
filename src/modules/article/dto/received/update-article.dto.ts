import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsNotEmpty, IsString, IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleDto } from '../../../database/dto/article.dto';

export class UpdateArticleDto {
    @ApiProperty({ description: 'article id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    articleId: string

    @ApiProperty({ description: 'updated article entity', example: ArticleDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => ArticleDto)
    article: ArticleDto
}
