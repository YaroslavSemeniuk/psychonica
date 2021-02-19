import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../../database/dto/user.dto';

export class CreateUserDto {
    @ApiProperty({ description: 'new user entity', example: UserDto })
    @IsNotEmpty()
    @IsArray()
    @Type(() => UserDto)
    user: UserDto
}
