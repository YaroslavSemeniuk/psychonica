import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength,
} from 'class-validator';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class UpdateArticleDto {
    @ApiProperty({ description: 'article id to update', example: uuidv4() })
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
      description: 'description text in HTML format',
      example: '<\h1>Improving relationships and mutual understanding</h1>',
    })
    @IsOptional()
    @IsString()
    descriptionHtml?: string;

    @ApiPropertyOptional({ description: 'path to the article image', example: 'temp\\image.jpg' })
    @IsOptional()
    imgSrc?: string;

    @ApiPropertyOptional({
      description: 'gender by article',
      example: GenderEnum.MALE,
      enum: Object.values(GenderEnum),
    })
    @IsOptional()
    @IsEnum(GenderEnum)
    gender?: string;

    @ApiPropertyOptional({ description: 'article author', example: uuidv4() })
    @IsOptional()
    @IsString()
    @IsUUID('4')
    userId?: string;

    @ApiPropertyOptional({ description: 'categories by article', example: [uuidv4()] })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    @MinLength(1)
    categoriesIds?: string[]
}
