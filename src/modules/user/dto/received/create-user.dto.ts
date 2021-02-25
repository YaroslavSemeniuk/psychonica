import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Contains, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl,
} from 'class-validator';
import { RoleEnum } from '../../../../shared/enums/role.enum';
import { GenderEnum } from '../../../../shared/enums/gender.enum';

export class CreateUserDto {
    @ApiProperty({ description: 'user name', example: 'Sam' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'user email', example: 'Sam@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
      description: 'role user in application',
      example: RoleEnum.USER,
      enum: Object.values(RoleEnum),
    })
    @IsNotEmpty()
    @IsEnum(RoleEnum)
    role: string;

    @ApiProperty({ description: 'gender user', example: GenderEnum.FEMALE, enum: Object.values(GenderEnum) })
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: string;

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
