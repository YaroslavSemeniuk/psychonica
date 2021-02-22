import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus, Post,
  Put, Query, UsePipes,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { ROUTES } from '../../shared/config/routes';
import { AnswerDto } from '../database/dto/answer.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UpdateAnswerDto } from './dto/received/update-answer.dto';
import { CreateAnswerDto } from './dto/received/create-answer.dto';

@ApiTags(ROUTES.ANSWER.MAIN)
@Controller(ROUTES.ANSWER.MAIN)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: AnswerDto,
  })
  getAnswers(): Promise<AnswerDto[]> {
    return this.answerService.getAnswers();
  }

  @Get(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer was found',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  getAnswerById(@Query() query: GetByIdDto): Promise<AnswerDto> {
    return this.answerService.getAnswerById(query.id);
  }

  @Get(ROUTES.ANSWER.GET_BY_USER_ID)
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
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Answer created',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  createAnswer(@Body() data: CreateAnswerDto): Promise<AnswerDto> {
    return this.answerService.createAnswer(data.answer);
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer updated',
    type: AnswerDto,
  })
  @UsePipes(new ValidationPipe())
  updateAnswer(@Body() data: UpdateAnswerDto): Promise<AnswerDto> {
    return this.answerService.updateAnswer(data.answerId, data.answer);
  }

  @Delete(ROUTES.ID.DYNAMIC_ID)
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
