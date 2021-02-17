import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  titleText: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  descriptionText: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  text: string;

  @Column({ type: 'int' })
  countUseful: number;

  @Column({ type: 'int' })
  countUseless: number;

  @Column()
  @OneToMany(() => Question, (question) => question.id)
  questionId: string;
}
