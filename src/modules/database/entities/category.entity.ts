import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Article } from './article.entity';
import { Question } from './question.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'category id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, nullable: false, unique: true,
  })
  @ApiProperty({
    description: 'category id (category title transliteration) for SEO',
    example: 'relationships',
  })
  seoId: string

  @Column({
    type: 'varchar', length: 300, nullable: false, unique: true,
  })
  @ApiProperty({ description: 'category name', example: 'Relationships' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    type: 'varchar', length: 300, nullable: false, unique: true,
  })
  @ApiPropertyOptional({ description: 'category description', example: 'Relationships in the family' })
  @IsOptional()
  @IsString()
  description: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[]

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[]
}
