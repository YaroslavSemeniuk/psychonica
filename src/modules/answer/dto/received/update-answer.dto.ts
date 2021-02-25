import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min,
} from 'class-validator';

export class UpdateAnswerDto {
    @ApiProperty({ description: 'answer id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    id: string

    @ApiPropertyOptional({ description: 'title text', example: 'Love and relationships' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'description text', example: 'Ways to improve relationships' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
      description: 'main text',
      example: 'One of the best ways to improve your relationship is to play sports together',
    })
    @IsOptional()
    @IsString()
    text?: string;

    @ApiPropertyOptional({ description: 'counter dislikes by users', example: 10 })
    @IsOptional()
    @IsInt()
    @Min(0)
    countUseful?: number;

    @ApiPropertyOptional({ description: 'counter dislikes by users', example: 6 })
    @IsOptional()
    @IsInt()
    @Min(0)
    countUseless?: number;

    @ApiPropertyOptional({ description: 'the question to which we give the answer' })
    @IsOptional()
    question?: string;
}
