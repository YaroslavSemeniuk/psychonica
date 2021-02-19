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

  async getAll(): Promise<ArticleDto[]> {
    return this.articleRepository.find();
  }

  async getById(id: string): Promise<ArticleDto> {
    return this.articleRepository.findOne(id);
  }

  async getArticlesByAuthorId(authorId: string): Promise<ArticleDto[]> {
    return this.articleRepository.find({
      where: { authorId: `${authorId}` },
    });
  }

  async createOne(article: ArticleDto): Promise<ArticleDto> {
    const newArticle = await this.articleRepository.create(article); // crypto in Node
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  async update(id: string, article: ArticleDto): Promise<ArticleDto> {
    await this.articleRepository.update(id, article);
    return this.articleRepository.findOne(id);
  }

  async remove(id: string): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne(id);
    const deleteResponse = await this.articleRepository.delete(article);
    if (deleteResponse.affected) {
      return article;
    }
  }

  async getArticlesByGender(gender: string): Promise<ArticleDto[]> {
    return this.articleRepository.find({
      where: { gender: `${gender}` },
    });
  }

  async getArticlesByCategory(category: string): Promise<ArticleDto[]> {
    return this.articleRepository.find({
      where: { category: `${category}` },
    });
  }

  async getArticlesByGenderAndCategory(gender: string, category: string): Promise<ArticleDto[]> {
    return this.articleRepository.find({
      where: { gender, category },
    });
  }
}
