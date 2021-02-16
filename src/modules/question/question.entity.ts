import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { GenderEnum } from '../../shared/enums/gender.enum';
import { User } from '../user/user.entity';
import { Answer } from '../answer/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  @ManyToOne(() => Answer, (answer) => answer.id)
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

  @Column()
  answer: Answer;

  //@Column()
  //youtubeVideos: YoutubeVideos;
}
