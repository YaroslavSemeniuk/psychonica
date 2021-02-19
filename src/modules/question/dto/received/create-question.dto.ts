import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDto } from '../../../database/dto/question.dto';

export class CreateQuestionDto {
    @ApiProperty({ description: 'new question entity', example: QuestionDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => QuestionDto)
    question: QuestionDto
}
