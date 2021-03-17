import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query, UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ROUTES } from '../../shared/config/routes';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UpdateCategoryDto } from './dto/received/update-category.dto';
import { Category } from '../database/entities/category.entity';
import { CreateCategoryDto } from './dto/received/create-category.dto';
import { GetBySeoIdDto } from '../../shared/dto/get-by-seo-id.dto';

@ApiTags(ROUTES.CATEGORY.MAIN)
@Controller(ROUTES.CATEGORY.MAIN)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(ROUTES.CATEGORY.GET_ALL)
  @ApiOperation({ summary: 'Return all categories', description: 'Return all categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categories was found',
    type: Category,
  })
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(ROUTES.CATEGORY.GET_BY_ID)
  @ApiOperation({ summary: 'Return category by id', description: 'Return category by input id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category was found',
    type: Category,
  })
  @UsePipes(new ValidationPipe())
  getCategoryById(@Query() query: GetByIdDto): Promise<Category> {
    return this.categoryService.getCategoryById(query.id);
  }

  @Get(ROUTES.CATEGORY.GET_BY_SEO_ID)
  @ApiOperation({ summary: 'Return category by seo id', description: 'Return category by seo id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category was found',
    type: Category,
  })
  @UsePipes(new ValidationPipe())
  getCategoryBySeoId(@Query() query: GetBySeoIdDto): Promise<Category> {
    return this.categoryService.getCategoryBySeoId(query.seoId);
  }

  @Post()
  @ApiOperation({ summary: 'Create category', description: 'Create category and return it' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created',
    type: Category,
  })
  @UsePipes(new ValidationPipe())
  createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Put()
  @ApiOperation({ summary: 'Update category', description: 'Update category and return it' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category updated',
    type: Category,
  })
  @UsePipes(new ValidationPipe())
  updateCategory(@Body() data: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.updateCategory(data);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete category by id and return true on successful deletion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category deleted',
    type: Boolean,
  })
  @UsePipes(new ValidationPipe())
  deleteCategory(@Query() query: GetByIdDto): Promise<boolean> {
    return this.categoryService.removeCategory(query.id);
  }
}
