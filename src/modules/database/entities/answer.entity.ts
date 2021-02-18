import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'answer id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'title text', example: 'title for answer' })
  titleText: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'description text', example: 'description for answer' })
  descriptionText: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  @ApiProperty({ description: 'main text', example: 'main text in answer' })
  text: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'counter dislikes by users', example: '10' })
  countUseful: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'counter dislikes by users', example: '6' })
  countUseless: number;

  @Column()
  @OneToMany(() => Question, (question) => question.id)
  @ApiProperty({ description: 'question id', example: uuidv4() })
  questionId: string;
}
