import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../database/entities/answer.entity';
import { AnswerDto } from '../database/dto/answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async getAnswersByQuestionId(questionId: string): Promise<AnswerDto[]> {
    return this.answerRepository.find({ where: { questionId } });
  }

  async getAnswerById(id: string): Promise<AnswerDto> {
    return this.answerRepository.findOne(id);
  }

  async createAnswer(answer: AnswerDto): Promise<AnswerDto> {
    const newAnswer = await this.answerRepository.create(answer); // crypto in Node
    await this.answerRepository.save(newAnswer);
    return newAnswer;
  }

  async updateAnswer(id: string, answer: AnswerDto): Promise<AnswerDto> {
    return this.answerRepository.save({ id, answer });
  }

  async removeAnswer(id: string): Promise<boolean> {
    const deleteResponse = await this.answerRepository.delete(id);
    return !!deleteResponse.affected;
  }

  async getAnswersByUserId(userId: string): Promise<AnswerDto[]> {
    return this.answerRepository.find({
      where: { userId },
    });
  }
}
