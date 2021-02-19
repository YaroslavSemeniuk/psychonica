import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsNotEmpty, IsString, IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerDto } from '../../../database/dto/answer.dto';

export class UpdateAnswerDto {
    @ApiProperty({ description: 'answer id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    answerId: string

    @ApiProperty({ description: 'updated answer entity', example: AnswerDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => AnswerDto)
    answer: AnswerDto
}
