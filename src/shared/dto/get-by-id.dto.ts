import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetByIdDto {
  @ApiProperty({ description: 'entity id in uuidv4 format', example: uuidv4() })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  id: string;
}
