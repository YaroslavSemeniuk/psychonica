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
import { AnswerDto } from '../database/dto/answer.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UpdateAnswerDto } from './dto/received/update-answer.dto';

@ApiTags(ROUTES.ANSWER.MAIN)
@Controller(ROUTES.ANSWER.MAIN)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get(ROUTES.ANSWER.GET_BY_ID)
  @ApiOperation({ summary: 'Return answer by id', description: 'Return answer by input id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer was found',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  getAnswerById(@Query() query: GetByIdDto): Promise<AnswerDto> {
    return this.answerService.getAnswerById(query.id);
  }

  @Get(ROUTES.ANSWER.GET_BY_QUESTION_ID)
  @ApiOperation({ summary: 'Return answers by question', description: 'Return answers by question id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: AnswerDto,
  })
  getAnswersByQuestionId(@Query() query: GetByIdDto): Promise<AnswerDto[]> {
    return this.answerService.getAnswersByQuestionId(query.id);
  }

  @Get(ROUTES.ANSWER.GET_BY_USER_ID)
  @ApiOperation({ summary: 'Return answers by user', description: 'Return answers by user id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  getAnswersByUserId(@Query() query: GetByIdDto): Promise<AnswerDto[]> {
    return this.answerService.getAnswersByUserId(query.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create answer', description: 'Create answer and return it' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Answer created',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  createAnswer(@Body() answer: AnswerDto): Promise<AnswerDto> {
    return this.answerService.createAnswer(answer);
  }

  @Put()
  @ApiOperation({ summary: 'Update answer', description: 'Update answer and return it' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer updated',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  updateAnswer(@Body() data: UpdateAnswerDto): Promise<AnswerDto> {
    return this.answerService.updateAnswer(data.answerId, data.answer);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete answer',
    description: 'Delete answer by id and return true on successful deletion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer deleted',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  deleteAnswer(@Query() query: GetByIdDto): Promise<boolean> {
    return this.answerService.removeAnswer(query.id);
  }
}
