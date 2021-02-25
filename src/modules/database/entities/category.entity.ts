import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Question } from './question.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, nullable: false, unique: true,
  })
  name: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[]

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[]
}
