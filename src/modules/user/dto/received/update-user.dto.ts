import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID,
} from 'class-validator';
import { RoleEnum } from '../../../../shared/enums/role.enum';
import { GenderEnum } from '../../../../shared/enums/gender.enum';
import { SocialLink } from '../../../database/entities/socialLinks.entity';

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

    @ApiPropertyOptional({ description: 'path to the user image', example: 'temp\\image.jpg' })
    @IsOptional()
    imgSrc?: string;

    @ApiPropertyOptional({ description: 'user phone number', example: '+1684546664898' })
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ description: 'title text', example: 'Info about me' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({
      description: 'description text',
      example: 'I am a psychologist and author of books on psychology',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
      description: 'description text in HTML format',
      example: '<\h1>I am a psychologist and author of books on psychology</h1>',
    })
    @IsOptional()
    @IsString()
    descriptionHtml?: string;

    @ApiPropertyOptional({ description: 'user\'s social links', type: () => [SocialLink] })
    @IsOptional()
    socialLinks?: SocialLink[]
}
