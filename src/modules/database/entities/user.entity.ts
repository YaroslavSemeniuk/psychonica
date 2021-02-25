import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Contains, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl,
} from 'class-validator';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { Question } from './question.entity';
import { Article } from './article.entity';
import { Answer } from './answer.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'user id', example: uuidv4() })
  readonly id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  @ApiProperty({ description: 'user name', example: 'Sam' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({
    type: 'varchar', length: 300, nullable: true, unique: true,
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

  @Column({ type: 'varchar', length: 300, nullable: true })
  @ApiPropertyOptional({
    description: 'link to the user\'s instagram',
    example: 'https://www.instagram.com/',
  })
  @IsOptional()
  @IsUrl()
  @Contains('instagram.com')
  instagram: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @ApiPropertyOptional({
    description: 'link to the user\'s telegram',
    example: 'https://web.telegram.org/',
  })
  @IsOptional()
  @IsUrl()
  @Contains('web.telegram.org')
  telegram: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @ApiPropertyOptional({ description: 'link to the user\'s vk', example: 'https://www.vk.com/' })
  @IsOptional()
  @IsUrl()
  @Contains('vk.com')
  vk: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @ApiPropertyOptional({
    description: 'link to the user\'s facebook',
    example: 'https://www.facebook.com/',
  })
  @IsOptional()
  @IsUrl()
  @Contains('facebook.com')
  facebook: string;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[]

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[]

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[]
}
