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

  async getAnswers(): Promise<AnswerDto[]> {
    return this.answerRepository.find();
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
    let deletedResult = false;
    const answer = await this.answerRepository.findOne(id);
    const deleteResponse = await this.answerRepository.delete(answer);
    if (deleteResponse.affected) {
      deletedResult = true;
    }
    return deletedResult;
  }

  async getAnswersByUserId(userId: string): Promise<AnswerDto[]> {
    return this.answerRepository.find({
      where: { userId },
    });
  }
}
