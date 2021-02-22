import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from '../database/entities/category.entity';
import { AnswerService } from '../answer/answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  // exports: [AnswerService],
})
export class CategoryModule {}
