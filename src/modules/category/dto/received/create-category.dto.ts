import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from '../../../database/dto/category.dto';

export class CreateCategoryDto {
    @ApiProperty({ description: 'new category entity', type: () => CategoryDto })
    @IsNotEmpty()
    category: CategoryDto
}
