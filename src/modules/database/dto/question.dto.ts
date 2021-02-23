import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { AnswerDto } from './answer.dto';
import { UserDto } from './user.dto';
import { CategoryDto } from './category.dto';

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

    @ApiProperty({ description: 'gender by question', example: GenderEnum, enum: Object.values(GenderEnum) })
    gender: string;

    @ApiProperty({ description: 'question author', type: () => UserDto })
    user?: UserDto;

    @ApiProperty({ description: 'category by question', type: () => CategoryDto })
    category?: CategoryDto;

    @ApiProperty({ description: 'answers related to this question', type: () => [AnswerDto] })
    answers?: AnswerDto[];
}
