import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ArticleDto } from './article.dto';
import { QuestionDto } from './question.dto';

export class CategoryDto {
    @ApiProperty({ description: 'category name', example: 'Relationships' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: 'articles related to this category ', type: () => [ArticleDto] })
    @IsOptional()
    articles?: ArticleDto[];

    @ApiPropertyOptional({ description: 'questions related to this category', type: () => [QuestionDto] })
    @IsOptional()
    questions?: QuestionDto[];
}
