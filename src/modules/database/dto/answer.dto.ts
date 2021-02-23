import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt, IsNotEmpty, IsString, Min,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { QuestionDto } from './question.dto';

export class AnswerDto {
    @ApiPropertyOptional({ description: 'answer id', example: uuidv4() })
    @Exclude()
    id?:string;

    @ApiProperty({ description: 'title text', example: 'Love and relationships' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'description text', example: 'Ways to improve relationships' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
      description: 'main text',
      example: 'One of the best ways to improve your relationship is to play sports together',
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiPropertyOptional({ description: 'counter dislikes by users', example: 10 })
    @IsInt()
    @Min(0)
    countUseful?: number;

    @ApiPropertyOptional({ description: 'counter dislikes by users', example: 6 })
    @IsInt()
    @Min(0)
    countUseless?: number;

    @ApiProperty({ description: 'the question to which we give the answer', type: () => QuestionDto })
    @IsNotEmpty()
    question: QuestionDto;
}
