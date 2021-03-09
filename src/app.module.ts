import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AnswerModule } from './modules/answer/answer.module';
import { QuestionModule } from './modules/question/question.module';
import { CategoryModule } from './modules/category/category.module';
import { ArticleModule } from './modules/article/article.module';
import { DatabaseModule } from './modules/database/database.module';
import {ParserModule} from "./modules/parser/parser.module";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AnswerModule,
    QuestionModule,
    CategoryModule,
    ArticleModule,
    ParserModule,
  ],
})
export class AppModule {}
