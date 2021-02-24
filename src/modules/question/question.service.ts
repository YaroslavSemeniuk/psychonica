import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../database/entities/question.entity';
import { CreateQuestionDto } from './dto/received/create-question.dto';
import { UpdateQuestionDto } from './dto/received/update-question.dto';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';
import { MessageCodeError } from '../../shared/errors/message-code-error';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getQuestions(): Promise<QuestionEntity[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: string): Promise<QuestionEntity> {
    return this.questionRepository.findOne(id);
  }

  async createQuestion(data:CreateQuestionDto): Promise<QuestionEntity> {
    const user = await this.userRepository.findOne(data.userId);
    if (!user) throw new MessageCodeError('user:does not exist');

    const category = await this.categoryRepository.findOne(data.categoryId);
    if (!category) throw new MessageCodeError('category:does not exist');

    const newQuestion = this.questionRepository.create(data);
    newQuestion.user = user;
    newQuestion.category = category;

    return this.questionRepository.save(newQuestion);
  }

  async updateQuestion(data: UpdateQuestionDto): Promise<QuestionEntity> {
    // const user = this.userService.getUserById(data.userId);
    // const category = this.categoryService.getCategoryById(data.categoryId);
    // const answers = this.answerService.getAnswersByQuestionId(data.questionId);
    // return this.questionRepository.save({
    //   ...data, user, category, answers,
    // });
    return this.questionRepository.save({ id: data.questionId, data });
  }

  async removeQuestion(id: string): Promise<boolean> {
    const deleteResponse = await this.questionRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
