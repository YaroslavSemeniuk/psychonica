import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsNotEmpty, IsString, IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDto } from '../../../database/dto/question.dto';

export class UpdateQuestionDto {
    @ApiProperty({ description: 'question id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    questionId: string

    @ApiProperty({ description: 'updated question entity', example: QuestionDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => QuestionDto)
    question: QuestionDto
}
