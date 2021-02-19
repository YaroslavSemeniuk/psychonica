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

  async getQuestions(): Promise<QuestionDto[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: string): Promise<QuestionDto> {
    return this.questionRepository.findOne(id);
  }

  async createQuestion(question: QuestionDto): Promise<QuestionDto> {
    const newQuestion = await this.questionRepository.create(question); // crypto in Node
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }

  async updateQuestion(id: string, question: QuestionDto): Promise<QuestionDto> {
    await this.questionRepository.update(id, question);
    return this.questionRepository.findOne(id);
  }

  async removeQuestion(id: string): Promise<QuestionDto> {
    const question = await this.questionRepository.findOne(id);
    const deleteResponse = await this.questionRepository.delete(question);
    if (deleteResponse.affected) {
      return question;
    }
  }
}
