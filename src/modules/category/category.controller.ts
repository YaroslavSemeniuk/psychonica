import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from '../database/entities/category.entity';
import { CategoryService } from './category.service';
import { ROUTES } from '../../shared/config/routes';

@ApiTags(ROUTES.CATEGORY.MAIN)
@Controller(ROUTES.CATEGORY.MAIN)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories was found',
    type: Category,
  })
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category was found',
    type: Category,
  })
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created',
    type: Category,
  })
  createCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category updated',
    type: Category,
  })
  updateCategory(
    @Body() category: Category,
    @Param('id') id: string,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category deleted',
    type: Category,
  })
  deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.removeCategory(id);
  }
}
