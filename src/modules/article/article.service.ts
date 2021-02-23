import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../database/entities/article.entity';
import { ArticleDto } from '../database/dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
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

  async createOne(article: ArticleDto): Promise<Article> {
    const newArticle = await this.articleRepository.create(article); // crypto in Node
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  async update(id: string, article: ArticleDto): Promise<Article> {
    return this.articleRepository.save({ id, article });
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
