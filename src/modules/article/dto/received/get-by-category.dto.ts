import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetByCategoryDto {
  @ApiProperty({ description: 'category name', example: 'one of the names of the categories' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
