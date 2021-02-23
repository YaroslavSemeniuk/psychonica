import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';
import { QuestionDto } from './question.dto';

export class CategoryDto {
    @ApiProperty({ description: 'category id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'category name', example: 'Relationships' })
    name: string;

    @ApiProperty({ description: 'articles related to this category ', type: () => [ArticleDto] })
    articles?: ArticleDto[];

    @ApiProperty({ description: 'questions related to this category', type: () => [QuestionDto] })
    questions?: QuestionDto[];
}
