import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../database/entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async getAnswers(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  async getAnswerById(id: string): Promise<Answer> {
    return this.answerRepository.findOne(id);
  }

  async createAnswer(answer: Answer): Promise<Answer> {
    const newAnswer = await this.answerRepository.create(answer); // crypto in Node
    await this.answerRepository.save(newAnswer);
    return newAnswer;
  }

  async updateAnswer(id: string, answer: Answer): Promise<Answer> {
    await this.answerRepository.update(id, answer);
    return this.answerRepository.findOne(id);
  }

  async removeAnswer(id: string): Promise<Answer> {
    const answer = await this.answerRepository.findOne(id);
    const deleteResponse = await this.answerRepository.delete(answer);
    if (deleteResponse.affected) {
      return answer;
    }
  }

  async getAnswersByAuthorId(authorId: string): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { authorId: `${authorId}` },
    });
  }
}
