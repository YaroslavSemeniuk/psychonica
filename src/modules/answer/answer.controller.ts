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
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { Answer } from '../database/entities/answer.entity';
import { ROUTES } from '../../shared/config/routes';

@ApiTags(ROUTES.ANSWER.MAIN)
@Controller(ROUTES.ANSWER.MAIN)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: Answer,
  })
  getAnswers(): Promise<Answer[]> {
    return this.answerService.getAnswers();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer was found',
    type: Answer,
  })
  getAnswerById(@Param('id') id: string): Promise<Answer> {
    return this.answerService.getAnswerById(id);
  }

  @Get('/getByAuthorId/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: Answer,
  })
  getAnswersByAuthorId(@Param('authorId') authorId: string): Promise<Answer[]> {
    return this.answerService.getAnswersByAuthorId(authorId);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Answer created',
    type: Answer,
  })
  createAnswer(@Body() answer: Answer): Promise<Answer> {
    return this.answerService.createAnswer(answer);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer updated',
    type: Answer,
  })
  updateAnswer(
    @Body() answer: Answer,
    @Param('id') id: string,
  ): Promise<Answer> {
    return this.answerService.updateAnswer(id, answer);
  }

  @Delete(':id') @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer deleted',
    type: Answer,
  })
  deleteAnswer(@Param('id') id: string): Promise<Answer> {
    return this.answerService.removeAnswer(id);
  }
}
