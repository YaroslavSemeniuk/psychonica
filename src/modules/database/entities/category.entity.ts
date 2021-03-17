import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn,
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
    type: 'varchar', nullable: false, unique: true,
  })
  @Index({ unique: true })
  @ApiProperty({
    description: 'category id (category title transliteration) for SEO',
    example: 'relationships',
  })
  seoId: string

  @Column({
    type: 'varchar', nullable: false, unique: true,
  })
  @ApiProperty({ description: 'category title', example: 'Relationships' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    type: 'varchar', nullable: true,
  })
  @ApiPropertyOptional({ description: 'category description', example: 'Relationships in the family' })
  @IsOptional()
  @IsString()
  description: string;

  @ManyToMany(() => Article, (article) => article.categories, { cascade: false })
  articles: Article[]

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[]
}
