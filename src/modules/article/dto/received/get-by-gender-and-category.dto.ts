import { v4 as uuidv4 } from 'uuid';
import {
  IsEnum, IsNotEmpty, IsString, IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class GetByGenderAndCategoryDto {
    @ApiProperty({ description: 'user gender', example: GenderEnum.MALE, enum: Object.values(GenderEnum) })
    @IsString()
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: string;

    @ApiProperty({ description: 'category id', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    categoryId: string;
}
