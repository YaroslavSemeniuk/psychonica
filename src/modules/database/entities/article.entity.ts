import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity({ name: 'article' })
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'article id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false, unique: true,
  })
  @ApiProperty({ description: 'title text', example: 'Love and relationships' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'description text', example: 'Ways to improve relationships' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  @ApiProperty({
    description: 'main text',
    example: 'In this article, we will look at some ways to improve relationships',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @Column({ type: 'varchar', length: 700, nullable: true })
  @ApiPropertyOptional({ description: 'path to the article image', example: 'temp\\image.jpg' })
  @IsOptional()
  imgSrc: string;

  @Column({ type: 'enum', enum: GenderEnum })
  @ApiProperty({
    description: 'gender by article',
    example: GenderEnum.MALE,
    enum: Object.values(GenderEnum),
  })
  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;
}
