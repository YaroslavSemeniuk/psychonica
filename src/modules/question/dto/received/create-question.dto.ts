import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class CreateQuestionDto {
    @ApiProperty({ description: 'title text', example: 'Family relationship' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'description text', example: 'How to improve the relationship?' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
      description: 'main text',
      example: 'Our feelings disappear for each other. How to fix it?',
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiPropertyOptional({ description: 'path to the question image', example: 'temp\\image.jpg' })
    @IsOptional()
    imgSrc?: string;

    @ApiProperty(
      { description: 'gender by question', example: GenderEnum.FEMALE, enum: Object.values(GenderEnum) },
    )
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: string;

    @ApiProperty({ description: 'question author id', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    userId: string;

    @ApiProperty({ description: 'category id by question', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    categoryId: string;
}
