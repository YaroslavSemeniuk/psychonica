import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleDto } from '../../../database/dto/article.dto';
import { AnswerDto } from '../../../database/dto/answer.dto';

export class CreateAnswerDto {
    @ApiProperty({ description: 'new answer entity', example: AnswerDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => ArticleDto)
    answer: AnswerDto
}
