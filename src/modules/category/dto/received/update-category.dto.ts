import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsNotEmpty, IsString, IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from '../../../database/dto/category.dto';

export class UpdateCategoryDto {
    @ApiProperty({ description: 'category id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    categoryId: string

    @ApiProperty({ description: 'updated category entity', example: CategoryDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => CategoryDto)
    category: CategoryDto
}
