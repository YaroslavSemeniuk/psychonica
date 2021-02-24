import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { AnswerDto } from './answer.dto';
import { UserDto } from './user.dto';
import { CategoryDto } from './category.dto';

export class QuestionDto {
    @ApiProperty({ description: 'title text', example: 'Family relationship' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'description text', example: 'How to improve the relationship?' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
      description: 'main text',
      example: 'Our feelings disappear for each other. How to fix it?',
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({ description: 'path to the question image', example: 'temp\\image.jpg' })
    @IsNotEmpty()
    imgSrc: string;

    @ApiProperty({ description: 'gender by question', example: GenderEnum, enum: Object.values(GenderEnum) })
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: string;

    @ApiProperty({ description: 'question author' })
    @IsNotEmpty()
    userId: string;

    @ApiPropertyOptional({ description: 'question author', type: () => UserDto })
    @IsNotEmpty()
    user: UserDto;

    @ApiProperty({ description: 'category id by question' })
    @IsNotEmpty()
    categoryId: string;

    @ApiPropertyOptional({ description: 'category by question', type: () => CategoryDto })
    @IsNotEmpty()
    category: CategoryDto;

    @ApiPropertyOptional({ description: 'answers related to this question', type: () => [AnswerDto] })
    @IsOptional()
    @IsNotEmpty()
    answers?: AnswerDto[];
}
