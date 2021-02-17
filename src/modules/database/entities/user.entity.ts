import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  username: string;

  @Column({
    type: 'varchar', length: 300, nullable: true, unique: true,
  })
  email: string;

  @Column()
  role: RoleEnum;

  @Column()
  gender: GenderEnum;

  @Column('simple-array', { default: '' })
  socialLinks: string[];
}
