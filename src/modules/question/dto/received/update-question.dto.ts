import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, IsUUID,
} from 'class-validator';
import { QuestionDto } from '../../../database/dto/question.dto';

export class UpdateQuestionDto {
    @ApiProperty({ description: 'question id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    questionId: string

    @ApiProperty({ description: 'updated question entity', type: () => QuestionDto })
    @IsNotEmpty()
    question: QuestionDto
}
