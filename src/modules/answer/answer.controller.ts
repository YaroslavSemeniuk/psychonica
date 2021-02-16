import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  getAnswers(): Promise<Answer[]> {
    return this.answerService.getAnswers();
  }

  @Get(':id')
  getAnswerById(@Param('id') id: string): Promise<Answer> {
    return this.answerService.getAnswerById(id);
  }

  @Get(':id')
  getAnswersByAuthorId(@Param('authorId') authorId: string): Promise<Answer[]> {
    return this.answerService.getAnswersByAuthorId(authorId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createAnswer(@Body() answer: Answer): Promise<Answer> {
    return this.answerService.createAnswer(answer);
  }

  @Put(':id')
  updateAnswer(
    @Body() answer: Answer,
    @Param('id') id: string,
  ): Promise<Answer> {
    return this.answerService.updateAnswer(id, answer);
  }

  @Delete(':id')
  deleteAnswer(@Param('id') id: string): Promise<Answer> {
    return this.answerService.removeAnswer(id);
  }
}
