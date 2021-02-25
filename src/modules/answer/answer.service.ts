import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../database/entities/answer.entity';
import { CreateAnswerDto } from './dto/received/create-answer.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { UpdateAnswerDto } from './dto/received/update-answer.dto';
import { Question } from '../database/entities/question.entity';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAnswersByQuestionId(questionId: string): Promise<Answer[]> {
    return this.answerRepository.find({ where: { questionId } });
  }

  async getAnswerById(id: string): Promise<Answer> {
    return this.answerRepository.findOne(id);
  }

  async createAnswer(data: CreateAnswerDto): Promise<Answer> {
    const existAnswer = await this.answerRepository.findOne({
      title: data.title,
      description: data.description,
    });
    if (existAnswer) throw new MessageCodeError('answer:exist');

    const user = await this.userRepository.findOne(data.userId);
    if (!user) throw new MessageCodeError('user:notFound');

    const existQuestion = await this.questionRepository.findOne({ id: data.questionId });
    if (!existQuestion) throw new MessageCodeError('question:notFound');

    const newAnswer = this.answerRepository.create(data);
    await this.answerRepository.save(data);
    return newAnswer;
  }

  async updateAnswer(data: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.answerRepository.findOne(data.id);
    if (!answer) throw new MessageCodeError('answer:notFound');
    Object.assign(answer, data);
    await this.answerRepository.save(answer);
    return answer;
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
