import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { User } from './user.entity';
import { Answer } from './answer.entity';

@Entity({ name: 'question' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => Answer, (answer) => answer.id)
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

  @ManyToOne(() => Category, (category) => category.name)
  category: string;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: string;

  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @ManyToOne(() => Answer, (answer) => answer.id)
  answerId: string;
}
