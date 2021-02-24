import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { UpdateCategoryDto } from './dto/received/update-category.dto';
import { CreateCategoryDto } from './dto/received/create-category.dto';

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

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(data: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.save({ ...data });
  }

  async removeCategory(id: string): Promise<boolean> {
    const deleteResponse = await this.categoryRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
