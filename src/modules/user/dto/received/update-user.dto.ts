import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsNotEmpty, IsString, IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../../database/dto/user.dto';

export class UpdateUserDto {
    @ApiProperty({ description: 'user id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    userId: string

    @ApiProperty({ description: 'updated user entity', example: UserDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => UserDto)
    user: UserDto
}
