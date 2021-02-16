import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  titleText: string;

  @Column()
  descriptionText: string;

  @Column()
  text: string;

  @Column()
  countUseful: number;

  @Column()
  countUseless: number;

  @Column()
  @OneToMany(() => Question, (question) => question.id)
  questionId: string;
}
