import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity({ name: 'article' })
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'article id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'title text', example: 'title for article' })
  titleText: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'description text', example: 'description for article' })
  descriptionText: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  @ApiProperty({ description: 'main text', example: 'main text in article' })
  text: string;

  @Column({ type: 'varchar', length: 700, nullable: true })
  @ApiProperty({ description: 'path to the article image', example: 'C:\\temp\\image.jpg' })
  imgSrc: string;

  @Column()
  @ManyToOne(() => Category, (category) => category.name)
  @ApiProperty({ description: 'category by article', example: 'the category to which this article belongs' })
  category: string;

  @Column()
  @ApiProperty({ description: 'gender by article', example: GenderEnum })
  gender: GenderEnum;

  @Column()
  @ManyToOne(() => User, (user) => user.id) // проверить работоспос.
  @ApiProperty({ description: 'author id', example: uuidv4() })
  authorId: string;
}
