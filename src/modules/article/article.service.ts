import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../database/entities/article.entity';
import { CreateArticleDto } from './dto/received/create-article.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { UpdateArticleDto } from './dto/received/update-article.dto';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';
import { ToTranslit } from '../../shared/config/constants/transliterator.helper';

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
    return this.articleRepository.find({ relations: ['categories'] });
  }

  async getById(id: string): Promise<Article> {
    return this.articleRepository.findOne(id, { relations: ['categories'] });
  }

  async getArticlesByUserId(userId: string): Promise<Article[]> {
    return this.articleRepository.find({ where: { userId }, relations: ['categories'] });
  }

  async createOne(data: CreateArticleDto): Promise<Article> {
    const seoId = ToTranslit(data.title);
    const article = await this.articleRepository.findOne({
      where: [{ title: data.title }, { seoId }],
    });
    if (article) throw new MessageCodeError('article:exist');

    const user = await this.userRepository.findOne({ id: data.userId });
    if (!user) throw new MessageCodeError('user:notFound');

    const categories = [];
    let categoryId;
    for (categoryId of data.categoriesIds) {
      const category = await this.categoryRepository.findOne({ id: categoryId });
      if (!category) throw new MessageCodeError('category:notFound');
      categories.push(category);
    }

    const newArticle = this.articleRepository.create(data);
    newArticle.seoId = seoId;
    newArticle.categories = categories;
    return this.articleRepository.save(newArticle);
  }

  async update(data: UpdateArticleDto): Promise<Article> {
    const article = await this.articleRepository.findOne(data.id);
    if (!article) throw new MessageCodeError('article:notFound');
    if (data.title) {
      const seoId = ToTranslit(data.title);
      const articleExist = !!await this.articleRepository.findOne({ seoId });
      if (articleExist) throw new MessageCodeError('article:exist');
      article.seoId = seoId;
    }
    if (data.categoriesIds) {
      let categoryId;
      for (categoryId of data.categoriesIds) {
        const existCategory = await this.categoryRepository.findOne({ id: categoryId });
        if (!existCategory) throw new MessageCodeError('category:notFound');
      }
    }
    Object.assign(article, data);
    await this.articleRepository.save(article);
    return article;
  }

  async remove(id: string): Promise<boolean> {
    const deleteResponse = await this.articleRepository.createQueryBuilder()
      .delete()
      .from(Article)
      .where('id = :id', { id })
      .execute();
    return !!deleteResponse.affected;
  }

  async getArticlesByGender(gender: string): Promise<Article[]> {
    return this.articleRepository.createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .where('article.gender IN (:...genders)', { genders: [gender, 'female both male'] }).getMany();
  }

  async getArticlesByCategoryId(categoryId: string): Promise<Article[]> {
    // #TODO: not displayed all categories to which the article belongs
    return this.articleRepository.createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .where('category.id = :id', { id: categoryId })
      .getMany();
  }

  async getArticlesByGenderAndCategoryId(gender: string, categoryId: string): Promise<Article[]> {
    return this.articleRepository.createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .where('category.id = :id', { id: categoryId })
      .andWhere('article.gender IN (:...genders)', { genders: [gender, 'female both male'] })
      .getMany();
  }
}
