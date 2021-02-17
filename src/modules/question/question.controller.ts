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
import { QuestionService } from './question.service';
import { Question } from '../database/entities/question.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getArticles(): Promise<Question[]> {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  getArticleById(@Param('id') id: string): Promise<Question> {
    return this.questionService.getQuestionById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArticle(@Body() question: Question): Promise<Question> {
    return this.questionService.createQuestion(question);
  }

  @Put(':id')
  updateArticle(
    @Body() question: Question,
    @Param('id') id: string,
  ): Promise<Question> {
    return this.questionService.updateQuestion(id, question);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string): Promise<Question> {
    return this.questionService.removeQuestion(id);
  }
}
