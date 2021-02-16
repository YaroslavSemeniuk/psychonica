import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ nullable: false })
  name: string;
}
