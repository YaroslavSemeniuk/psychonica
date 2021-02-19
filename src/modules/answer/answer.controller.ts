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
import { ROUTES } from '../../shared/config/routes';
import { AnswerDto } from '../database/dto/answer.dto';

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

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer was found',
    type: AnswerDto,
  })
  getAnswerById(@Param('id') id: string): Promise<AnswerDto> {
    return this.answerService.getAnswerById(id);
  }

  @Get('/getByAuthorId/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answers was found',
    type: AnswerDto,
  })
  getAnswersByAuthorId(@Param('authorId') authorId: string): Promise<AnswerDto[]> {
    return this.answerService.getAnswersByAuthorId(authorId);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Answer created',
    type: AnswerDto,
  })
  createAnswer(@Body() answer: AnswerDto): Promise<AnswerDto> {
    return this.answerService.createAnswer(answer);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer updated',
    type: AnswerDto,
  })
  updateAnswer(
    @Body() answer: AnswerDto,
    @Param('id') id: string,
  ): Promise<AnswerDto> {
    return this.answerService.updateAnswer(id, answer);
  }

  @Delete(':id') @ApiResponse({
    status: HttpStatus.OK,
    description: 'Answer deleted',
    type: AnswerDto,
  })
  deleteAnswer(@Param('id') id: string): Promise<AnswerDto> {
    return this.answerService.removeAnswer(id);
  }
}
