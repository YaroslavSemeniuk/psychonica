import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../database/entities/question.entity';
import { QuestionDto } from '../database/dto/question.dto';

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
    return this.questionRepository.findOne(id);
  }

  async createQuestion(question: QuestionDto): Promise<Question> {
    const newQuestion = await this.questionRepository.create(question);
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }

  async updateQuestion(id: string, question: QuestionDto): Promise<Question> {
    return this.questionRepository.save({ id, question });
  }

  async removeQuestion(id: string): Promise<boolean> {
    const deleteResponse = await this.questionRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
