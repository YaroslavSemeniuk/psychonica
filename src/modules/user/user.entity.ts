import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../../shared/enums/role.enum";
import { GenderEnum } from "../../shared/enums/gender.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  username: string;

  @Column("text", { unique: true })
  email: string;

  @Column()
  role: RoleEnum;

  @Column()
  gender: GenderEnum;

  @Column({
    array: true,
    default: [],
    nullable: false,
  })
  socialLinks: string;
}
