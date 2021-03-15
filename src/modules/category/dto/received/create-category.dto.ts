import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ description: 'category name', example: 'Conflicts' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'category description', example: 'Conflicts in the family' })
    @IsOptional()
    @IsString()
    description: string;
}
