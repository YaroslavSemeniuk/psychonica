import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { AnswerModule } from "./modules/answer/answer.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionModule } from "./modules/question/question.module";
import { CategoryModule } from "./modules/category/category.module";
import { ArticleModule } from "./modules/article/article.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AnswerModule,
    QuestionModule,
    CategoryModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
