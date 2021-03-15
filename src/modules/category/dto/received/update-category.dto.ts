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

    @ApiPropertyOptional({ description: 'category name', example: 'Conflicts' })
    @IsOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: 'category description', example: 'Conflicts in the family' })
    @IsOptional()
    @IsString()
    description: string;
}
