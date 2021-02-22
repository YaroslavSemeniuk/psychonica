import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class GetByGenderAndCategoryDto {
    @ApiProperty({ description: 'user gender', example: GenderEnum.MALE })
    @IsString()
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: string;

    @ApiProperty({ description: 'category name', example: 'Love and relationships' })
    @IsString()
    @IsNotEmpty()
    category: string;
}
