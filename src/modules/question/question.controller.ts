import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from '../database/entities/question.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROUTES } from '../../shared/config/routes';

@ApiTags(ROUTES.QUESTION.MAIN)
@Controller(ROUTES.QUESTION.MAIN)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questions was found',
    type: Question,
  })
  getQuestions(): Promise<Question[]> {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question was found',
    type: Question,
  })
  getQuestionById(@Param('id') id: string): Promise<Question> {
    return this.questionService.getQuestionById(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Question created',
    type: Question,
  })
  createQuestion(@Body() question: Question): Promise<Question> {
    return this.questionService.createQuestion(question);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question updated',
    type: Question,
  })
  updateQuestion(
    @Body() question: Question,
    @Param('id') id: string,
  ): Promise<Question> {
    return this.questionService.updateQuestion(id, question);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question deleted',
    type: Question,
  })
  deleteQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionService.removeQuestion(id);
  }
}
