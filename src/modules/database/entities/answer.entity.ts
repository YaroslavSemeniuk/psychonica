import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { User } from './user.entity';

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

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question

  @ManyToOne(() => User, (user) => user.answers)
  user: User;
}
