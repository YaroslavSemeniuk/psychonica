import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { QuestionService } from './modules/question/question.service';
import { QuestionController } from './modules/question/question.controller';
import { AnswerController } from './modules/answer/answer.controller';
import { AnswerService } from './modules/answer/answer.service';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [UserModule, DatabaseModule, AnswerModule],
  controllers: [
    AppController,
    UserController,
    QuestionController,
    AnswerController,
  ],
  providers: [AppService, QuestionService, AnswerService],
})
export class AppModule {}
