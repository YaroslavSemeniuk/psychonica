import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { QuestionDto } from '../../../database/dto/question.dto';

export class CreateQuestionDto {
    @ApiProperty({ description: 'new question entity', type: () => QuestionDto })
    @IsNotEmpty()
    question: QuestionDto
}
