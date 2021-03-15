import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetByCategoryDto {
  @ApiProperty({ description: 'category id', example: uuidv4() })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  categoryId: string;
}
