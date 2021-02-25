import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query, UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { ROUTES } from '../../shared/config/routes';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { UpdateQuestionDto } from './dto/received/update-question.dto';
import { CreateQuestionDto } from './dto/received/create-question.dto';
import { Question } from '../database/entities/question.entity';

@ApiTags(ROUTES.QUESTION.MAIN)
@Controller(ROUTES.QUESTION.MAIN)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(ROUTES.QUESTION.GET_ALL)
  @ApiOperation({ summary: 'Return all questions', description: 'Return all questions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Questions was found',
    type: Question,
  })
  getQuestions(): Promise<Question[]> {
    return this.questionService.getQuestions();
  }

  @Get(ROUTES.QUESTION.GET_BY_ID)
  @ApiOperation({ summary: 'Return question by id', description: 'Return question by input id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question was found',
    type: Question,
  })
  @UsePipes(new ValidationPipe())
  getQuestionById(@Query() query: GetByIdDto): Promise<Question> {
    return this.questionService.getQuestionById(query.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create question', description: 'Create question and return it' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Question created',
    type: Question,
  })
  @UsePipes(new ValidationPipe())
  createQuestion(@Body() data: CreateQuestionDto): Promise<Question> {
    return this.questionService.createQuestion(data);
  }

  @Put()
  @ApiOperation({ summary: 'Update question', description: 'Update question and return it' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question updated',
    type: Question,
  })
  @UsePipes(new ValidationPipe())
  updateQuestion(@Body() data: UpdateQuestionDto): Promise<Question> {
    return this.questionService.updateQuestion(data);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete question',
    description: 'Delete question by id and return true on successful deletion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question deleted',
    type: Boolean,
  })
  @UsePipes(new ValidationPipe())
  deleteQuestion(@Query() query: GetByIdDto): Promise<boolean> {
    return this.questionService.removeQuestion(query.id);
  }
}
