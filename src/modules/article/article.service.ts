import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../database/entities/article.entity';
import { CreateArticleDto } from './dto/received/create-article.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { UpdateArticleDto } from './dto/received/update-article.dto';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
    const existArticle = await this.articleRepository.findOne({ title: data.title });
    if (existArticle) throw new MessageCodeError('article:exist');

    const existUser = await this.userRepository.findOne({ id: data.userId });
    if (!existUser) throw new MessageCodeError('user:notFound');

    const existCategory = await this.categoryRepository.findOne({ id: data.categoryId });
    if (!existCategory) throw new MessageCodeError('category:notFound');

    const newArticle = this.articleRepository.create(data);
    await this.articleRepository.save(data);
    return newArticle;
  }

  async update(data: UpdateArticleDto): Promise<Article> {
    const article = await this.articleRepository.findOne(data.id);
    if (!article) throw new MessageCodeError('article:notFound');
    Object.assign(article, data);
    await this.articleRepository.save(article);
    return article;
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

  async getArticlesByCategoryId(categoryId: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { categoryId },
    });
  }

  async getArticlesByGenderAndCategory(gender: string, categoryId: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { gender, categoryId },
    });
  }
}
