import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: string): Promise<Question> {
    return await this.questionRepository.findOne(id);
  }

  async createQuestion(question: Question): Promise<Question> {
    const newQuestion = await this.questionRepository.create(question); // crypto in Node
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }

  async updateQuestion(id: string, question: Question): Promise<Question> {
    await this.questionRepository.update(id, question);
    return await this.questionRepository.findOne(id);
  }

  async removeQuestion(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne(id);
    const deleteResponse = await this.questionRepository.delete(question);
    if (deleteResponse.affected) {
      return question;
    }
  }
}
