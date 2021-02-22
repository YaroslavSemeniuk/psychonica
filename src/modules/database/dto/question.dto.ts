import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../shared/enums/gender.enum';

export class QuestionDto {
    @ApiProperty({ description: 'question id', example: uuidv4() })
    id?: string;

    @ApiProperty({ description: 'title text', example: 'Family relationship' })
    title: string;

    @ApiProperty({ description: 'description text', example: 'How to improve the relationship?' })
    description: string;

    @ApiProperty({
      description: 'main text',
      example: 'Our feelings disappear for each other. How to fix it?',
    })
    text: string;

    @ApiProperty({ description: 'path to the question image', example: 'C:\\temp\\image.jpg' })
    imgSrc: string;

    @ApiProperty({ description: 'category by question', example: 'Relationships' })
    category: string;

    @ApiProperty({ description: 'gender by question', example: GenderEnum, enum: Object.values(GenderEnum) })
    gender: string;

    @ApiProperty({ description: 'author id', example: uuidv4() })
    userId: string;

    @ApiProperty({ description: 'answer id', example: uuidv4() })
    answerId: string;
}
