import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { QuestionModule } from '../question/question.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, QuestionModule],
  providers: [AnswerService],
  controllers: [AnswerController],
  exports: [AnswerService],
})
export class AnswerModule {}
