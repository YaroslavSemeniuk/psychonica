import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { RoleEnum } from '../../../../shared/enums/role.enum';
import { GenderEnum } from '../../../../shared/enums/gender.enum';
import { SocialLink } from '../../../database/entities/socialLinks.entity';

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

    @ApiPropertyOptional({ description: 'path to the user image', example: 'temp\\image.jpg' })
    @IsOptional()
    imgSrc: string;

    @ApiPropertyOptional({ description: 'user phone number', example: '+1684546664898' })
    @IsOptional()
    phone: string;

    @ApiProperty({ description: 'title text', example: 'Info about me' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
      description: 'description text',
      example: 'I am a psychologist and author of books on psychology',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiPropertyOptional({
      description: 'description text in HTML format',
      example: '<\h1>I am a psychologist and author of books on psychology</h1>',
    })
    @IsOptional()
    @IsString()
    descriptionHtml: string;

    @ApiPropertyOptional({ description: 'user\'s social links', type: () => [SocialLink] })
    @IsOptional()
    socialLinks: SocialLink[]
}
