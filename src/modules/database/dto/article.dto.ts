import { v4 as uuidv4 } from 'uuid';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsNotEmpty, IsString,
} from 'class-validator';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { UserDto } from './user.dto';
import { CategoryDto } from './category.dto';

export class ArticleDto {
    @ApiPropertyOptional({ description: 'article id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'title text', example: 'Love and relationships' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'description text', example: 'Ways to improve relationships' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
      description: 'main text',
      example: 'In this article, we will look at some ways to improve relationships',
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({ description: 'path to the article image', example: 'image.jpg' })
    @IsNotEmpty()
    imgSrc: string;

    @ApiProperty({
      description: 'gender by article',
      example: GenderEnum.MALE,
      enum: Object.values(GenderEnum),
    })
    @IsNotEmpty()
    @IsEnum(GenderEnum)
    gender: string;

    @ApiProperty({ description: 'article author', type: () => UserDto })
    user: UserDto;

    @ApiProperty({ description: 'category by article', type: () => CategoryDto })
    category: CategoryDto;
}
