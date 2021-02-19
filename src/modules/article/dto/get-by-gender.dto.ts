import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { GenderEnum } from '../../../shared/enums/gender.enum';

export class GetByGenderDto {
  @ApiProperty({ description: 'project name', example: 'ThePij' })
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: string;
}
