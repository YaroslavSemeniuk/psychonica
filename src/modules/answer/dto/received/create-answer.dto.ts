import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AnswerDto } from '../../../database/dto/answer.dto';

export class CreateAnswerDto {
    @ApiProperty({ description: 'new answer entity', type: () => AnswerDto })
    @IsNotEmpty()
    answer: AnswerDto
}
