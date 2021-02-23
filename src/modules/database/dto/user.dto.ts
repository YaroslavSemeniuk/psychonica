import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { ArticleDto } from './article.dto';
import { QuestionDto } from './question.dto';

export class UserDto {
    @ApiPropertyOptional({ description: 'user id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'user name', example: 'Sam' })
    name: string;

    @ApiProperty({ description: 'user email', example: 'Sam@gmail.com' })
    email: string;

    @ApiProperty({
      description: 'role user in application',
      example: RoleEnum.USER,
      enum: Object.values(RoleEnum),
    })
    role: string;

    @ApiProperty({ description: 'gender user', example: GenderEnum.FEMALE, enum: Object.values(GenderEnum) })
    gender: string;

    @ApiPropertyOptional({
      description: 'link to the user\'s instagram',
      example: 'https://www.instagram.com/',
    })
    @IsUrl()
    instagram?: string;

    @ApiPropertyOptional({
      description: 'link to the user\'s telegram',
      example: 'https://web.telegram.org/',
    })
    telegram?: string;

    @ApiPropertyOptional({ description: 'link to the user\'s vk', example: 'https://www.vk.com/' })
    vk?: string;

    @ApiPropertyOptional({
      description: 'link to the user\'s facebook',
      example: 'https://www.facebook.com/',
    })
    facebook?: string;

    @ApiProperty({ description: 'articles created by this user', type: () => [ArticleDto] })
    articles?: ArticleDto[];

    @ApiProperty({ description: 'questions created by this user', type: () => [QuestionDto] })
    questions?: QuestionDto[];
}
