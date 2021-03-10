import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID,
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
    type: 'varchar', nullable: false, unique: true,
  })
  @ApiProperty({
    description: 'article id (article title transliteration) for SEO',
    example: 'good-relations-and-mutual-understanding',
  })
  seoId: string

  @Column({
    type: 'varchar', default: '', nullable: false, unique: true,
  })
  @ApiProperty({ description: 'title text', example: 'Good relations and mutual understanding' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    type: 'varchar', default: '', nullable: false,
  })
  @ApiProperty({
    description: 'description text',
    example: 'Improving relationships and mutual understanding',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  @ApiPropertyOptional({
    description: 'description text in HTML format',
    example: '<\h1>Improving relationships and mutual understanding</h1>',
  })
  @IsOptional()
  @IsString()
  descriptionHtml: string;

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

  @Column({ type: 'uuid', nullable: false })
  @ApiProperty({ description: 'author id by article', example: uuidv4() })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string

  @Column({ type: 'text', array: true, nullable: false })
  @ApiProperty({ description: 'categories ids by article', example: [uuidv4()] })
  @IsNotEmpty()
  @IsArray()
  categoriesIds: string[]

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @OneToMany(() => Category, (category) => category.article)
  categories: Category[];
}
