import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ArticleDto } from '../../../database/dto/article.dto';

export class UpdateArticleDto {
    @ApiProperty({ description: 'article id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    articleId: string

    @ApiProperty({ description: 'updated article entity', type: () => ArticleDto })
    @IsNotEmpty()
    article: ArticleDto
}
