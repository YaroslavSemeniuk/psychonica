import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query, UsePipes,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ROUTES } from '../../shared/config/routes';
import { CategoryDto } from '../database/dto/category.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { CreateCategoryDto } from './dto/received/create-category.dto';
import { UpdateCategoryDto } from './dto/received/update-category.dto';

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

  @Get(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category was found',
    type: CategoryDto,
  })
  @UsePipes(new ValidationPipe())
  getCategoryById(@Query() query: GetByIdDto): Promise<CategoryDto> {
    return this.categoryService.getCategoryById(query.id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category created',
    type: CategoryDto,
  })
  @UsePipes(new ValidationPipe())
  createCategory(@Body() data: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.createCategory(data.category);
  }

  @Put(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category updated',
    type: CategoryDto,
  })
  @UsePipes(new ValidationPipe())
  updateCategory(@Body() data: UpdateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.updateCategory(data.categoryId, data.category);
  }

  @Delete(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category deleted',
    type: CategoryDto,
  })
  @UsePipes(new ValidationPipe())
  deleteCategory(@Query() query: GetByIdDto): Promise<boolean> {
    return this.categoryService.removeCategory(query.id);
  }
}
