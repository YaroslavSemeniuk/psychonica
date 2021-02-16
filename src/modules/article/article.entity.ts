import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '../../shared/enums/gender.enum';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  titleText: string;

  @Column()
  descriptionText: string;

  @Column()
  text: string;

  @Column()
  imgSrc: string;

  @Column()
  @ManyToOne(() => Category, (category) => category.name)
  category: Category;

  @Column()
  gender: GenderEnum;

  @Column()
  @ManyToOne(() => User, (user) => user.id) // проверить работоспос.
  authorId: string;
}
