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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { ROUTES } from '../../shared/config/routes';
import { QuestionDto } from '../database/dto/question.dto';

@ApiTags(ROUTES.QUESTION.MAIN)
@Controller(ROUTES.QUESTION.MAIN)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questions was found',
    type: QuestionDto,
  })
  getQuestions(): Promise<QuestionDto[]> {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question was found',
    type: QuestionDto,
  })
  getQuestionById(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.getQuestionById(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Question created',
    type: QuestionDto,
  })
  createQuestion(@Body() question: QuestionDto): Promise<QuestionDto> {
    return this.questionService.createQuestion(question);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question updated',
    type: QuestionDto,
  })
  updateQuestion(
    @Body() question: QuestionDto,
    @Param('id') id: string,
  ): Promise<QuestionDto> {
    return this.questionService.updateQuestion(id, question);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question deleted',
    type: QuestionDto,
  })
  deleteQuestion(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionService.removeQuestion(id);
  }
}
