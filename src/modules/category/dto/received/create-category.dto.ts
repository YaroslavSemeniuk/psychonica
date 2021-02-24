import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ description: 'category name', example: 'Relationships' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: 'articles related to this category ' })
    @IsOptional()
    articleIds?: string[];

    @ApiPropertyOptional({ description: 'questions related to this category' })
    @IsOptional()
    questionIds?: string[];
}
