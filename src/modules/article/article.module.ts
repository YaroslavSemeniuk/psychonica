import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from '../database/entities/article.entity';
import { AnswerService } from '../answer/answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService],
  controllers: [ArticleController],
  // exports: [AnswerService],
})
export class ArticleModule {}
