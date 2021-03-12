import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetByCategoryDto {
  @ApiProperty({ description: 'category id', example: uuidv4() })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
