import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { UpdateCategoryDto } from './dto/received/update-category.dto';
import { CreateCategoryDto } from './dto/received/create-category.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { Article } from '../database/entities/article.entity';
import { ToTranslit } from '../../shared/config/constants/transliterator.helper';

@Injectable()
export class CategoryService {
  constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
      @InjectRepository(Article)
      private readonly articleRepository: Repository<Article>,
  ) {
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    const seoId = ToTranslit(data.title);
    const existCategory = await this.categoryRepository.findOne({
      where: [{ name: data.title }, { seoId }],
    });
    if (existCategory) throw new MessageCodeError('category:exist');
    const newCategory = this.categoryRepository.create(data);
    newCategory.seoId = seoId;
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(data: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne(data.id);
    if (!category) throw new MessageCodeError('category:notFound');
    if (data.title) {
      const seoId = ToTranslit(data.title);
      const categoryExist = !!await this.categoryRepository.findOne({ seoId });
      if (categoryExist) throw new MessageCodeError('category:exist');
      category.seoId = seoId;
    }
    Object.assign(category, data);
    await this.categoryRepository.save(category);
    return category;
  }

  async removeCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new MessageCodeError('category:notFound');
    // const categoryIsUsed = await this.articleRepository.find({ where: category });
    const categoryIsUsed = await this.articleRepository.createQueryBuilder('category')
      .where({ id })
      .leftJoinAndSelect('category.articles', 'articles')
      .select(['article.id as id']);
    if (categoryIsUsed) throw new MessageCodeError('category:isUsed');

    // if (categoryIsUsed.length > 0) throw new MessageCodeError('category:isUsed');
    const deleteResponse = await this.categoryRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
