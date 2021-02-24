import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { Article } from '../database/entities/article.entity';
import { CreateArticleDto } from './dto/received/create-article.dto';
import { UserService } from '../user/user.service';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { UpdateArticleDto } from './dto/received/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getById(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }

  async getArticlesByUserId(userId: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { userId },
    });
  }

  async createOne(data: CreateArticleDto): Promise<Article> {
    const user = await this.userService.getUserById(data.userId);
    if (isEmpty(user)) throw new MessageCodeError('user:does not exist');
    const newArticle = await this.articleRepository.create(data);
    newArticle.user = user;
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  async update(data: UpdateArticleDto): Promise<Article> {
    // const user = this.userService.getUserById(data.userId);
    // const category = this.categoryService.getCategoryById(data.categoryId);
    return this.articleRepository.save({ id: data.articleId, data });
  }

  async remove(id: string): Promise<boolean> {
    const deleteResponse = await this.articleRepository.delete(id);
    return !!deleteResponse.affected;
  }

  async getArticlesByGender(gender: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { gender },
    });
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { category },
    });
  }

  async getArticlesByGenderAndCategory(gender: string, category: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { gender, category },
    });
  }
}
