import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { GenderEnum } from "../../shared/enums/gender.enum";
import { User } from "../user/user.entity";
import { Answer } from "../answer/answer.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  @ManyToOne(() => Answer, (answer) => answer.id)
  readonly id: string;

  @Column({ type: "varchar", length: 300, default: "", nullable: false })
  titleText: string;

  @Column({ type: "varchar", length: 300, default: "", nullable: false })
  descriptionText: string;

  @Column({ type: "varchar", default: "", nullable: false })
  text: string;

  @Column({ type: "varchar", length: 700, nullable: true })
  imgSrc: string;

  @Column()
  @ManyToOne(() => Category, (category) => category.name)
  category: string;

  @Column()
  gender: GenderEnum;

  @Column()
  @ManyToOne(() => User, (user) => user.id) // проверить работоспос.
  authorId: string;

  @Column()
  @ManyToOne(() => Answer, (answer) => answer.id)
  answerId: string;

  //@Column()
  //youtubeVideos: YoutubeVideos;
}
