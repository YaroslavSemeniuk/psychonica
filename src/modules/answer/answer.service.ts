import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { Answer } from '../database/entities/answer.entity';
import { CreateAnswerDto } from './dto/received/create-answer.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { QuestionService } from '../question/question.service';
import { UpdateAnswerDto } from './dto/received/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly questionService: QuestionService,
  ) {}

  async getAnswersByQuestionId(questionId: string): Promise<Answer[]> {
    return this.answerRepository.find({ where: { questionId } });
  }

  async getAnswerById(id: string): Promise<Answer> {
    return this.answerRepository.findOne(id);
  }

  async createAnswer(data: CreateAnswerDto): Promise<Answer> {
    const question = await this.questionService.getQuestionById(data.questionId);
    if (isEmpty(question)) throw new MessageCodeError('question:does not exist');

    const answer = await this.answerRepository.create(data);
    answer.question = question;
    await this.answerRepository.save(answer);
    return answer;
  }

  async updateAnswer(data: UpdateAnswerDto): Promise<Answer> {
    const question = await this.questionService.getQuestionById(data.question);
    return this.answerRepository.save({ ...data, question });
  }

  async removeAnswer(id: string): Promise<boolean> {
    const deleteResponse = await this.answerRepository.delete(id);
    return !!deleteResponse.affected;
  }

  async getAnswersByUserId(userId: string): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { userId },
    });
  }
}
