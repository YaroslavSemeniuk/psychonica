import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from '../database/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswerService],
  controllers: [AnswerController],
  // exports: [AnswerService], // не понял зачем
})
export class AnswerModule {}
