import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query, UsePipes,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { ROUTES } from '../../shared/config/routes';
import { QuestionDto } from '../database/dto/question.dto';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { CreateQuestionDto } from './dto/received/create-question.dto';
import { UpdateQuestionDto } from './dto/received/update-question.dto';

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

  @Get(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question was found',
    type: QuestionDto,
  })
  @UsePipes(new ValidationPipe())
  getQuestionById(@Query() query: GetByIdDto): Promise<QuestionDto> {
    return this.questionService.getQuestionById(query.id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Question created',
    type: QuestionDto,
  })
  @UsePipes(new ValidationPipe())
  createQuestion(@Body() data: CreateQuestionDto): Promise<QuestionDto> {
    return this.questionService.createQuestion(data.question);
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question updated',
    type: QuestionDto,
  })
  @UsePipes(new ValidationPipe())
  updateQuestion(@Body() data: UpdateQuestionDto): Promise<QuestionDto> {
    return this.questionService.updateQuestion(data.questionId, data.question);
  }

  @Delete(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question deleted',
    type: QuestionDto,
  })
  @UsePipes(new ValidationPipe())
  deleteQuestion(@Query() query: GetByIdDto): Promise<boolean> {
    return this.questionService.removeQuestion(query.id);
  }
}
