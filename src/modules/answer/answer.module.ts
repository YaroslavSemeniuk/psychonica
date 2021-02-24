import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from '../database/entities/answer.entity';
import { QuestionService } from '../question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionService],
  providers: [AnswerService],
  controllers: [AnswerController],
  exports: [AnswerService],
})
export class AnswerModule {}
