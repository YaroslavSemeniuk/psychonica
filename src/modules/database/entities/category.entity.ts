import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'category id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, nullable: false, unique: true,
  })
  @ApiProperty({ description: 'category name', example: 'one of the names of the categories' })
  name: string;
}
