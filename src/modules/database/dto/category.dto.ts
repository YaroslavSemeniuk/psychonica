import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ArticleDto } from './article.dto';
import { QuestionDto } from './question.dto';

export class CategoryDto {
    @ApiPropertyOptional({ description: 'category id', example: uuidv4() })
    @Exclude()
    id?:string;

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
