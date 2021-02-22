import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../../database/dto/user.dto';

export class CreateUserDto {
    @ApiProperty({ description: 'new user entity', type: () => UserDto })
    @IsNotEmpty()
    user: UserDto
}
