import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { Question } from './question.entity';
import { Article } from './article.entity';
import { Answer } from './answer.entity';
import { SocialNetwork } from './socialLinks.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'user id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, nullable: false, unique: true,
  })
  @ApiProperty({
    description: 'user id (name & surname transliteration) for SEO',
    example: 'vyacheslav-prakh',
  })
  seoId: string

  @Column({
    type: 'varchar', length: 300, nullable: false, unique: true,
  })
  @ApiProperty({ description: 'user name & surname', example: 'Vyacheslav Prakh' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({
    type: 'varchar', length: 300, nullable: true,
  })
  @ApiProperty({ description: 'user email', example: 'Sam@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ type: 'enum', enum: RoleEnum })
  @ApiProperty({
    description: 'role user in application',
    example: RoleEnum.USER,
    enum: Object.values(RoleEnum),
  })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: string;

  @Column({ type: 'enum', enum: GenderEnum })
  @ApiProperty({ description: 'gender user', example: GenderEnum.FEMALE, enum: Object.values(GenderEnum) })
  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: string;

  @Column({ type: 'varchar', length: 700, nullable: true })
  @ApiPropertyOptional({ description: 'path to the user image', example: 'temp\\image.jpg' })
  @IsOptional()
  imgSrc: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiPropertyOptional({ description: 'user phone number', example: '+1684546664898' })
  @IsOptional()
  phone: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'title text', example: 'Info about me' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    type: 'varchar', length: 700, default: '', nullable: false,
  })
  @ApiProperty({
    description: 'description text',
    example: 'I am a psychologist and author of books on psychology',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({
    type: 'varchar', length: 700, nullable: true,
  })
  @ApiPropertyOptional({
    description: 'description text in HTML format',
    example: '<\h1>I am a psychologist and author of books on psychology</h1>',
  })
  @IsOptional()
  @IsString()
  descriptionHtml: string;

  @OneToMany(() => SocialNetwork, (socialNetworks) => socialNetworks.user)
  @JoinColumn()
  socialNetworks: SocialNetwork[]

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[]

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[]

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[]
}
