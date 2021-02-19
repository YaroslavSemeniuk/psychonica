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
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  titleText: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  descriptionText: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  text: string;

  @Column({ type: 'varchar', length: 700, nullable: true })
  imgSrc: string;

  @Column()
  @ManyToOne(() => Category, (category) => category.name)
  category: string;

  @Column()
  gender: GenderEnum;

  @Column()
  @ManyToOne(() => User, (user) => user.id) // проверить работоспос.
  userId: string;
}
