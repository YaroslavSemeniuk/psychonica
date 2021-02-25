import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { UpdateCategoryDto } from './dto/received/update-category.dto';
import { CreateCategoryDto } from './dto/received/create-category.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';

@Injectable()
export class CategoryService {
  constructor(
      @InjectRepository(Category)
      private readonly categoryRepository: Repository<Category>,
  ) {
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    const existCategory = await this.categoryRepository.findOne({ name: data.name });
    if (existCategory) throw new MessageCodeError('category:exist');
    const newCategory = this.categoryRepository.create(data);
    await this.categoryRepository.save(data);
    return newCategory;
  }

  async updateCategory(data: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne(data.id);
    if (!category) throw new MessageCodeError('category:notFound');
    Object.assign(category, data);
    await this.categoryRepository.save(category);
    return category;
  }

  async removeCategory(id: string): Promise<boolean> {
    const deleteResponse = await this.categoryRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
