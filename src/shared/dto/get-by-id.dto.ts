import { ApiProperty } from '@nestjs/swagger';

export class GetByIdDto {
  @ApiProperty({ description: 'project name', example: 'ThePij' })
  id: string;
}
