import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from '../database/entities/answer.entity';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswerModule {}
