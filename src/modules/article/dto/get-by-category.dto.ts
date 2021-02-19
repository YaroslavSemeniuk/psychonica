import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetByCategoryDto {
  @ApiProperty({ description: 'project name', example: 'ThePij' })
  @IsString()
  @IsNotEmpty()
  category: string;
}
