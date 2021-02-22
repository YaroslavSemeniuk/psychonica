import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from '../database/dto/category.dto';
import { Category } from '../database/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<CategoryDto[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: string): Promise<CategoryDto> {
    return this.categoryRepository.findOne(id);
  }

  async createCategory(category: CategoryDto): Promise<CategoryDto> {
    const newCategory = await this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(id: string, category: CategoryDto): Promise<CategoryDto> {
    return this.categoryRepository.save({ id, category });
  }

  async removeCategory(id: string): Promise<boolean> {
    let deletedResult = false;
    const category = await this.categoryRepository.findOne(id);
    const deleteResponse = await this.categoryRepository.delete(category);
    if (deleteResponse.affected) {
      deletedResult = true;
    }
    return deletedResult;
  }
}
