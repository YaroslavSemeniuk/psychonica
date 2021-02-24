import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { QuestionEntity } from './question.entity';

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

  @Column({ type: 'int', default: 0 })
  countUseful: number;

  @Column({ type: 'int', default: 0 })
  countUseless: number;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  question: QuestionEntity
}
