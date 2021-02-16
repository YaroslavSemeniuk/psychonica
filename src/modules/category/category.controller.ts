import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get()
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Put(':id')
  updateCategory(
    @Body() category: Category,
    @Param('id') id: string,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.removeCategory(id);
  }
}
