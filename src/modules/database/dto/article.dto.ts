import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../shared/enums/gender.enum';

export class ArticleDto {
    @ApiProperty({ description: 'article id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'title text', example: 'Love and relationships' })
    title: string;

    @ApiProperty({ description: 'description text', example: 'Ways to improve relationships' })
    description: string;

    @ApiProperty({ description: 'main text', example: 'In this article, we will look at some ways to improve relationships' })
    text: string;

    @ApiProperty({ description: 'path to the article image', example: 'C:\\temp\\image.jpg' })
    imgSrc: string;

    @ApiProperty({ description: 'category by article', example: 'Relationships' })
    category: string;

    @ApiProperty({ description: 'gender by article', example: GenderEnum.MALE, enum: Object.values(GenderEnum) })
    gender: string;

    @ApiProperty({ description: 'author id', example: uuidv4() })
    userId: string;
}
