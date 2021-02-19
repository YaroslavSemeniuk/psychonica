import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class GetByGenderAndCategoryDto {
    @ApiProperty({ description: 'user gender', example: GenderEnum.MALE })
    @IsString()
    @IsNotEmpty()
    gender: GenderEnum;

    @ApiProperty({ description: 'category name', example: 'one of the names of the categories' })
    @IsString()
    @IsNotEmpty()
    category: string;
}
