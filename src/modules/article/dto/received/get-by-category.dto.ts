import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetByCategoryDto {
  @ApiProperty({ description: 'category name', example: 'Love story' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
