import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { Question } from '../database/entities/question.entity';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { CreateQuestionDto } from './dto/received/create-question.dto';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { UpdateQuestionDto } from './dto/received/update-question.dto';
import { AnswerService } from '../answer/answer.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly answerService: AnswerService,
  ) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(id: string): Promise<Question> {
    return this.questionRepository.findOne(id);
  }

  async createQuestion(data: CreateQuestionDto): Promise<Question> {
    // const newQuestion = await this.questionRepository.create(question);
    // await this.questionRepository.save(newQuestion);
    // return newQuestion;

    const user = await this.userService.getUserById(data.userId);
    if (isEmpty(user)) throw new MessageCodeError('user:does not exist');

    const category = await this.categoryService.getCategoryById(data.category);
    if (isEmpty(category)) throw new MessageCodeError('category:does not exist');

    const newQuestion = await this.questionRepository.create(data);
    newQuestion.user = user;
    newQuestion.category = category;
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }

  async updateQuestion(data: UpdateQuestionDto): Promise<Question> {
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
