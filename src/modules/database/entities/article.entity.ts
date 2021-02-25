import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity({ name: 'article' })
export class Article {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false, unique: true,
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

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;
}
