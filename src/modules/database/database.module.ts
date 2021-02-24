import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../../shared/config/config.service';
import { QuestionEntity } from './entities/question.entity';
import { Category } from './entities/category.entity';
import { User } from './entities/user.entity';
import { Answer } from './entities/answer.entity';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([QuestionEntity, Category, User, Answer, Article])],
  exports: [TypeOrmModule.forFeature([QuestionEntity, Category, User, Answer, Article])],
})
export class DatabaseModule {}
