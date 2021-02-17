import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../database/entities/article.entity';

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

  async getArticlesByAuthorId(authorId: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { authorId: `${authorId}` },
    });
  }

  async createOne(article: Article): Promise<Article> {
    const newArticle = await this.articleRepository.create(article); // crypto in Node
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  async update(id: string, article: Article): Promise<Article> {
    await this.articleRepository.update(id, article);
    return this.articleRepository.findOne(id);
  }

  async remove(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne(id);
    const deleteResponse = await this.articleRepository.delete(article);
    if (deleteResponse.affected) {
      return article;
    }
  }

  async getArticlesByGender(gender: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { gender: `${gender}` },
    });
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { category: `${category}` },
    });
  }

  async getArticlesByGenderAndCategory(gender: string, category: string): Promise<Article[]> {
    return this.articleRepository.find({
      where: { gender, category },
    });
  }
}
