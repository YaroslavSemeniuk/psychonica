import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { User } from './user.entity';
import { Answer } from './answer.entity';

@Entity({ name: 'question' })
export class Question {
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

  @Column({ type: 'varchar', length: 700, nullable: true })
  imgSrc: string;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: string;

  @ManyToOne(() => User, (user) => user.questions)
  user: User

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]
}
