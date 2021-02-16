import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenderEnum } from "../../shared/enums/gender.enum";
import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";

@Entity({ name: "article" })
export class Article {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  titleText: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  descriptionText: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  text: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  imgSrc: string;

  @Column()
  @ManyToOne(() => Category, (category) => category.name)
  category: string;

  @Column()
  gender: GenderEnum;

  @Column()
  @ManyToOne(() => User, (user) => user.id) // проверить работоспос.
  authorId: string;
}
