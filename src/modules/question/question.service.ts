import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../database/entities/question.entity';
import { CreateQuestionDto } from './dto/received/create-question.dto';
import { UpdateQuestionDto } from './dto/received/update-question.dto';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';
import { MessageCodeError } from '../../shared/errors/message-code-error';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: string): Promise<Question> {
    return this.questionRepository.findOne(id);
  }

  async createQuestion(data:CreateQuestionDto): Promise<Question> {
    const existQuestion = await this.questionRepository.findOne({
      title: data.title,
      description: data.description,
    });
    if (existQuestion) throw new MessageCodeError('question:exist');

    const existUser = await this.userRepository.findOne({ id: data.userId });
    if (!existUser) throw new MessageCodeError('user:notFound');

    const existCategory = await this.categoryRepository.findOne({ id: data.categoryId });
    if (!existCategory) throw new MessageCodeError('category:notFound');

    const newQuestion = this.questionRepository.create(data);
    await this.questionRepository.save(data);
    return newQuestion;
  }

  async updateQuestion(data: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionRepository.findOne(data.id);
    if (!question) throw new MessageCodeError('question:notFound');
    Object.assign(question, data);
    await this.questionRepository.save(question);
    return question;
  }

  async removeQuestion(id: string): Promise<boolean> {
    const deleteResponse = await this.questionRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
