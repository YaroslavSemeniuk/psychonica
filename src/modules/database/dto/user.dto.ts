import { v4 as uuidv4 } from 'uuid';
import * as Joi from '@hapi/joi';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Contains, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl,
} from 'class-validator';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { ArticleDto } from './article.dto';
import { QuestionDto } from './question.dto';

export const ValidateUserSchema = Joi.object().keys({
  name: Joi.string().required(),
}).options({ allowUnknown: false });

export class UserDto {
  // @ApiPropertyOptional({ description: 'user id', example: uuidv4() })
  // id?: string;

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

    @ApiPropertyOptional({ description: 'articles created by this user', type: () => [ArticleDto] })
    @IsOptional()
    @IsNotEmpty()
    articles?: ArticleDto[];

    @ApiPropertyOptional({ description: 'questions created by this user', type: () => [QuestionDto] })
    @IsOptional()
    @IsNotEmpty()
    questions?: QuestionDto[];
}
