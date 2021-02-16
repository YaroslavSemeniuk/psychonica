import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    return await this.categoryRepository.findOne(id);
  }

  async createCategory(category: Category): Promise<Category> {
    const newCategory = await this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(id: string, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return await this.categoryRepository.findOne(id);
  }

  async removeCategory(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    const deleteResponse = await this.categoryRepository.delete(category);
    if (deleteResponse.affected) {
      return category;
    }
  }
}
