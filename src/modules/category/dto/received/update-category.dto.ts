import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional, IsString, IsUUID,
} from 'class-validator';

export class UpdateCategoryDto {
    @ApiProperty({ description: 'category id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    id: string

    @ApiPropertyOptional({ description: 'category name', example: 'Relationships' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'articles related to this category ' })
    @IsOptional()
    articlesIds?: string[];

    @ApiPropertyOptional({ description: 'questions related to this category' })
    @IsOptional()
    questionsIds?: string[];
}
