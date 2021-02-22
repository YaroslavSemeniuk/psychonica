import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({
    type: 'varchar', length: 300, nullable: true, unique: true,
  })
  email: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: string;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  instagram: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  telegram: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  vk: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  facebook: string;
}
