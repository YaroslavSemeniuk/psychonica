import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';

export class UserDto {
    @ApiProperty({ description: 'user id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'user name', example: 'Sam' })
    username: string;

    @ApiProperty({ description: 'user email', example: 'Sam@gmail.com' })
    email: string;

    @ApiProperty({ description: 'role user in application', example: RoleEnum.USER })
    role: RoleEnum;

    @ApiProperty({ description: 'gender user', example: GenderEnum.FEMALE })
    gender: GenderEnum;

    @ApiProperty({ description: 'link to the user\'s instagram', example: 'https://www.instagram.com/' })
    instagram: string;

    @ApiProperty({ description: 'link to the user\'s telegram', example: 'https://web.telegram.org/' })
    telegram: string;

    @ApiProperty({ description: 'link to the user\'s vk', example: 'https://www.vk.com/' })
    vk: string;

    @ApiProperty({ description: 'link to the user\'s facebook', example: 'https://www.facebook.com/' })
    facebook: string;
}
