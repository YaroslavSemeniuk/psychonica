import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from './category.entity';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { User } from './user.entity';
import { Answer } from './answer.entity';

@Entity({ name: 'question' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'question id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'title text', example: 'Family relationship' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'description text', example: 'How to improve the relationship?' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  @ApiProperty({
    description: 'main text',
    example: 'Our feelings disappear for each other. How to fix it?',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @Column({ type: 'varchar', length: 700, nullable: true })
  @ApiProperty({ description: 'path to the question image', example: 'temp\\image.jpg' })
  @IsNotEmpty()
  imgSrc: string;

  @Column({ type: 'enum', enum: GenderEnum })
  @ApiProperty({ description: 'gender by question', example: GenderEnum, enum: Object.values(GenderEnum) })
  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: string;

  @ApiProperty({ description: 'question author' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'category id by question' })
  @IsNotEmpty()
  categoryId: string;

  @ManyToOne(() => User, (user) => user.questions)
  user: User

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]
}
