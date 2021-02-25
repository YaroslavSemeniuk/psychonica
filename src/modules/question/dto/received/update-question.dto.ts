import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty, IsOptional, IsString, IsUUID,
} from 'class-validator';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class UpdateQuestionDto {
    @ApiProperty({ description: 'question id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    id: string

    @ApiPropertyOptional({ description: 'title text', example: 'Family relationship' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'description text', example: 'How to improve the relationship?' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
      description: 'main text',
      example: 'Our feelings disappear for each other. How to fix it?',
    })
    @IsOptional()
    @IsString()
    text?: string;

    @ApiPropertyOptional({
      description: 'gender by question',
      example: GenderEnum,
      enum: Object.values(GenderEnum),
    })
    @IsOptional()
    @IsEnum(GenderEnum)
    gender?: string;

    @ApiPropertyOptional({ description: 'question author' })
    @IsOptional()
    userId?: string;

    @ApiPropertyOptional({ description: 'category by question' })
    @IsOptional()
    categoryId?: string;

    @ApiPropertyOptional({ description: 'answers related to this question' })
    @IsOptional()
    @IsNotEmpty()
    answers?: string[];

    @ApiPropertyOptional({ description: 'path to the question image', example: 'temp\\image.jpg' })
    @IsOptional()
    imgSrc?: string;
}
