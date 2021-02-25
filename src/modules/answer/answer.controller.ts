import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus, Post,
  Put, Query, UsePipes,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { ROUTES } from '../../shared/config/routes';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UpdateAnswerDto } from './dto/received/update-answer.dto';
import { CreateAnswerDto } from './dto/received/create-answer.dto';
import { Answer } from '../database/entities/answer.entity';

@ApiTags(ROUTES.ANSWER.MAIN)
@Controller(ROUTES.ANSWER.MAIN)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get(ROUTES.ANSWER.GET_BY_ID)
  @ApiOperation({ summary: 'Return answer by id', description: 'Return answer by input id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer was found',
    type: Answer,
  })
  @UsePipes(new ValidationPipe())
  getAnswerById(@Query() query: GetByIdDto): Promise<Answer> {
    return this.answerService.getAnswerById(query.id);
  }

  @Get(ROUTES.ANSWER.GET_BY_QUESTION_ID)
  @ApiOperation({ summary: 'Return answers by question', description: 'Return answers by question id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: Answer,
  })
  getAnswersByQuestionId(@Query() query: GetByIdDto): Promise<Answer[]> {
    return this.answerService.getAnswersByQuestionId(query.id);
  }

  @Get(ROUTES.ANSWER.GET_BY_USER_ID)
  @ApiOperation({ summary: 'Return answers by user', description: 'Return answers by user id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: Answer,
  })
  @UsePipes(new ValidationPipe())
  getAnswersByUserId(@Query() query: GetByIdDto): Promise<Answer[]> {
    return this.answerService.getAnswersByUserId(query.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create answer', description: 'Create answer and return it' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Answer created',
    type: Answer,
  })
  @UsePipes(new ValidationPipe())
  createAnswer(@Body() params: CreateAnswerDto): Promise<Answer> {
    return this.answerService.createAnswer(params);
  }

  @Put()
  @ApiOperation({ summary: 'Update answer', description: 'Update answer and return it' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer updated',
    type: Answer,
  })
  @UsePipes(new ValidationPipe())
  updateAnswer(@Body() data: UpdateAnswerDto): Promise<Answer> {
    return this.answerService.updateAnswer(data);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete answer',
    description: 'Delete answer by id and return true on successful deletion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer deleted',
    type: Boolean,
  })
  @UsePipes(new ValidationPipe())
  deleteAnswer(@Query() query: GetByIdDto): Promise<boolean> {
    return this.answerService.removeAnswer(query.id);
  }
}
