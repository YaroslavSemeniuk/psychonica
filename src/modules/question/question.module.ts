import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { Question } from '../database/entities/question.entity';
import { QuestionController } from './question.controller';
import { AnswerService } from '../answer/answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService],
  controllers: [QuestionController],
  // exports: [AnswerService],
})
export class QuestionModule {}
