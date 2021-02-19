import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../shared/enums/gender.enum';

export class ArticleDto {
    @ApiProperty({ description: 'article id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'title text', example: 'title for article' })
    titleText: string;

    @ApiProperty({ description: 'description text', example: 'description for article' })
    descriptionText: string;

    @ApiProperty({ description: 'main text', example: 'main text in article' })
    text: string;

    @ApiProperty({ description: 'path to the article image', example: 'C:\\temp\\image.jpg' })
    imgSrc: string;

    @ApiProperty({ description: 'category by article', example: 'the category which this article belongs' })
    category: string;

    @ApiProperty({ description: 'gender by article', example: GenderEnum })
    gender: GenderEnum;

    @ApiProperty({ description: 'author id', example: uuidv4() })
    authorId: string;
}
