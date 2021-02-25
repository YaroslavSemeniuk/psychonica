import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID,
} from 'class-validator';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class CreateArticleDto {
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
      example: 'In this article, we will look at some ways to improve relationships',
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({
      description: 'gender by article',
      example: GenderEnum.MALE,
      enum: Object.values(GenderEnum),
    })
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: string;

    @ApiProperty({ description: 'article author', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    userId: string;

    @ApiProperty({ description: 'category by article', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    categoryId: string;

    @ApiPropertyOptional({ description: 'path to the article image', example: 'temp\\image.jpg' })
    @IsOptional()
    imgSrc?: string;
}
