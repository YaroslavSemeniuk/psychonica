import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
    @ApiProperty({ description: 'category id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'category name', example: 'one of the names of the categories' })
    name: string;
}
