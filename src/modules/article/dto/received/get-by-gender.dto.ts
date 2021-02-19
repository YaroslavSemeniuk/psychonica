import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class GetByGenderDto {
  @ApiProperty({ description: 'user gender', example: GenderEnum.MALE })
  @IsString()
  @IsNotEmpty()
  gender: GenderEnum;
}
