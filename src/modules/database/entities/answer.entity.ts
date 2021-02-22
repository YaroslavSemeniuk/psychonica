import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'answer' })
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  description: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  text: string;

  @Column({ type: 'int' })
  countUseful: number;

  @Column({ type: 'int' })
  countUseless: number;

  @OneToMany(() => Question, (question) => question.id)
  questionId: string;
}
