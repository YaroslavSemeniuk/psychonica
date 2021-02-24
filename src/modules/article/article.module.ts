import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from '../database/entities/article.entity';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UserService, CategoryService],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
