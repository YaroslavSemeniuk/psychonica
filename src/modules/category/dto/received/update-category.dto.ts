import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CategoryDto } from '../../../database/dto/category.dto';

export class UpdateCategoryDto {
    @ApiProperty({ description: 'category id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    categoryId: string

    @ApiProperty({ description: 'updated category entity', type: () => CategoryDto })
    @IsNotEmpty()
    category: CategoryDto
}
