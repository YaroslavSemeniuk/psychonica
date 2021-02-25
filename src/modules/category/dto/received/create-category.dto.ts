import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ description: 'category name', example: 'Relationships' })
    @IsNotEmpty()
    @IsString()
    name: string;
}
