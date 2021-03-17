import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBySeoIdDto {
    @ApiProperty({ description: 'entity seo id', example: 'dmitriy-kalinskiy' })
    @IsNotEmpty()
    @IsString()
    seoId: string
}
