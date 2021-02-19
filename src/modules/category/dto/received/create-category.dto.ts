import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from '../../../database/dto/category.dto';

export class CreateCategoryDto {
    @ApiProperty({ description: 'new category entity', example: CategoryDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => CategoryDto)
    category: CategoryDto
}
