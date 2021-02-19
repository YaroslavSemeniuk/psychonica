import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetByGenderAndCategoryDto {
    @ApiProperty({ description: 'project name', example: 'ThePij' })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty({ description: 'project name', example: 'ThePij' })
    @IsString()
    @IsNotEmpty()
    category: string;
}
