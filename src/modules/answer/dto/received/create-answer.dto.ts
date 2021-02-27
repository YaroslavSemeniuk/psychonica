import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt, IsNotEmpty, IsString, IsUUID, Min,
} from 'class-validator';

export class CreateAnswerDto {
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

    @ApiProperty({ description: 'user who give the answer', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    userId: string;

    @ApiProperty({
      description: 'the question to which we give the answer',
      example: uuidv4(),
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    questionId: string;
}
