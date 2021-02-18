import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './category.entity';
import { GenderEnum } from '../../../shared/enums/gender.enum';
import { User } from './user.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => Answer, (answer) => answer.id)
  @ApiProperty({ description: 'question id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'title text', example: 'title for question' })
  titleText: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'description text', example: 'description for question' })
  descriptionText: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  @ApiProperty({ description: 'main text', example: 'main text in question' })
  text: string;

  @Column({ type: 'varchar', length: 700, nullable: true })
  @ApiProperty({ description: 'path to the question image', example: 'C:\\temp\\image.jpg' })
  imgSrc: string;

  @Column()
  @ManyToOne(() => Category, (category) => category.name)
  @ApiProperty({ description: 'category by question', example: 'the category to which this question belongs' })
  category: string;

  @Column()
  @ApiProperty({ description: 'gender by question', example: GenderEnum })
  gender: GenderEnum;

  @Column()
  @ManyToOne(() => User, (user) => user.id) // проверить работоспос.
  authorId: string;

  @Column()
  @ManyToOne(() => Answer, (answer) => answer.id)
  @ApiProperty({ description: 'answer id', example: uuidv4() })
  answerId: string;

  // @Column()
  // youtubeVideos: YoutubeVideos;
}
