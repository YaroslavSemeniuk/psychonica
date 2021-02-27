import { v4 as uuidv4 } from 'uuid';
import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min,
} from 'class-validator';
import { Question } from './question.entity';
import { User } from './user.entity';

@Entity({ name: 'answer' })
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'answer id', example: uuidv4() })
  readonly id: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'title text', example: 'Love and relationships' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    type: 'varchar', length: 300, default: '', nullable: false,
  })
  @ApiProperty({ description: 'description text', example: 'Ways to improve relationships' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ type: 'varchar', default: '', nullable: false })
  @ApiProperty({
    description: 'main text',
    example: 'One of the best ways to improve your relationship is to play sports together',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @Column({ type: 'int', default: 0 })
  @ApiPropertyOptional({ description: 'counter dislikes by users', example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  countUseful: number;

  @Column({ type: 'int', default: 0 })
  @ApiPropertyOptional({ description: 'counter dislikes by users', example: 6 })
  @IsOptional()
  @IsInt()
  @Min(0)
  countUseless: number;

  @Column({ type: 'uuid', nullable: false })
  @ApiProperty({ description: 'author id by answer', example: uuidv4() })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string

  @Column({ type: 'uuid', nullable: false })
  @ApiProperty({ description: 'question id to which the answer belongs', example: uuidv4() })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  questionId: string

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question

  @ManyToOne(() => User, (user) => user.answers)
  user: User;
}
