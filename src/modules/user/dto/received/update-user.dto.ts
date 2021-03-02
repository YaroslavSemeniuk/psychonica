import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Contains, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID,
} from 'class-validator';
import { RoleEnum } from '../../../../shared/enums/role.enum';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class UpdateUserDto {
    @ApiProperty({ description: 'user id to update', example: uuidv4() })
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    id: string

    @ApiPropertyOptional({ description: 'user name', example: 'Sam' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'user email', example: 'Sam@gmail.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
      description: 'role user in application',
      example: RoleEnum.USER,
      enum: Object.values(RoleEnum),
    })
    @IsOptional()
    @IsEnum(RoleEnum)
    role?: string;

    @ApiPropertyOptional({
      description: 'gender user',
      example: GenderEnum.FEMALE,
      enum: Object.values(GenderEnum),
    })
    @IsOptional()
    @IsEnum(GenderEnum)
    gender?: string;

    @ApiPropertyOptional({
      description: 'link to the user\'s instagram',
      example: 'https://www.instagram.com/',
    })
    @IsOptional()
    @IsUrl()
    @Contains('instagram.com')
    instagram?: string;

    @ApiPropertyOptional({
      description: 'link to the user\'s telegram',
      example: 'https://web.telegram.org/',
    })
    @IsOptional()
    @IsUrl()
    @Contains('web.telegram.org')
    telegram?: string;

    @ApiPropertyOptional({ description: 'link to the user\'s vk', example: 'https://www.vk.com/' })
    @IsOptional()
    @IsUrl()
    @Contains('vk.com')
    vk?: string;

    @ApiPropertyOptional({
      description: 'link to the user\'s facebook',
      example: 'https://www.facebook.com/',
    })
    @IsOptional()
    @IsUrl()
    @Contains('facebook.com')
    facebook?: string;
}
