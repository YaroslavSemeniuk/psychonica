import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../modules/user/user.entity';
import { Article } from '../modules/article/article.entity';
import { Question } from '../modules/question/question.entity';
import { Answer } from '../modules/answer/answer.entity';
import { Category } from '../modules/category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [User, Category, Article, Question, Answer],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
