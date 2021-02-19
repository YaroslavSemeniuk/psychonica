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
import { CategoryService } from './category.service';
import { ROUTES } from '../../shared/config/routes';
import { CategoryDto } from '../database/dto/category.dto';

@ApiTags(ROUTES.CATEGORY.MAIN)
@Controller(ROUTES.CATEGORY.MAIN)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories was found',
    type: CategoryDto,
  })
  getCategories(): Promise<CategoryDto[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category was found',
    type: CategoryDto,
  })
  getCategoryById(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created',
    type: CategoryDto,
  })
  createCategory(@Body() category: CategoryDto): Promise<CategoryDto> {
    return this.categoryService.createCategory(category);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category updated',
    type: CategoryDto,
  })
  updateCategory(
    @Body() category: CategoryDto,
    @Param('id') id: string,
  ): Promise<CategoryDto> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category deleted',
    type: CategoryDto,
  })
  deleteCategory(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.removeCategory(id);
  }
}
