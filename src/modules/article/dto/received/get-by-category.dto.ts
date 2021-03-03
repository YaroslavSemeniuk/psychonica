import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetByCategoryDto {
  @ApiProperty({ description: 'categories ids', example: [uuidv4()] })
  @IsNotEmpty()
  categoriesIds: string[];
}
