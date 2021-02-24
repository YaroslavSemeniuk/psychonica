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
import { ArticleService } from './article.service';
import { ROUTES } from '../../shared/config/routes';
import { GetByGenderAndCategoryDto } from './dto/received/get-by-gender-and-category.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByGenderDto } from './dto/received/get-by-gender.dto';
import { GetByCategoryDto } from './dto/received/get-by-category.dto';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { ArticleDto } from '../database/dto/article.dto';
import { UpdateArticleDto } from './dto/received/update-article.dto';
import { CreateArticleDto } from './dto/received/create-article.dto';

@ApiTags(ROUTES.ARTICLE.MAIN)
@Controller(ROUTES.ARTICLE.MAIN)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @Get(ROUTES.ARTICLE.GET_ALL)
  @ApiOperation({ summary: 'Return all articles', description: 'Return all articles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  getArticles(): Promise<ArticleDto[]> {
    return this.articleService.getAll();
  }

  @Get(ROUTES.ARTICLE.GET_BY_ID)
  @ApiOperation({ summary: 'Return article by id', description: 'Return article by input id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticleById(@Query() query: GetByIdDto): Promise<ArticleDto> {
    return this.articleService.getById(query.id);
  }

  @Get(ROUTES.ARTICLE.GET_BY_USER_ID)
  @ApiOperation({ summary: 'Return articles by user', description: 'Return articles by user id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByUserId(@Query() query: GetByIdDto): Promise<ArticleDto[]> {
    return this.articleService.getArticlesByUserId(query.id);
  }
  @Get(ROUTES.ARTICLE.GET_BY_CATEGORY)
  @ApiOperation({ summary: 'Return articles by category', description: 'Return articles by category name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByCategory(@Query() query: GetByCategoryDto): Promise<ArticleDto[]> {
    return this.articleService.getArticlesByCategory(query.category);
  }

  @Get(ROUTES.ARTICLE.GET_BY_GENDER)
  @ApiOperation({ summary: 'Return articles by gender', description: 'Return articles by gender enum' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByGender(@Query() query: GetByGenderDto): Promise<ArticleDto[]> {
    return this.articleService.getArticlesByGender(query.gender);
  }

  @Get(ROUTES.ARTICLE.GET_BY_GENDER_AND_CATEGORY)
  @ApiOperation({
    summary: 'Return articles by gender and category',
    description: 'Return articles by gender enum and category name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByGenderAndCategory(@Query() query: GetByGenderAndCategoryDto): Promise<ArticleDto[]> {
    return this.articleService.getArticlesByGenderAndCategory(query.gender, query.category);
  }

  @Post()
  @ApiOperation({ summary: 'Create article', description: 'Create article and return it' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Article created',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  createArticle(@Body() article: CreateArticleDto): Promise<ArticleDto> {
    return this.articleService.createOne(article);
  }

  @Put()
  @ApiOperation({ summary: 'Update article', description: 'Update article and return it' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article updated',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  updateArticle(@Body() data: UpdateArticleDto): Promise<ArticleDto> {
    return this.articleService.update(data);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete article',
    description: 'Delete article by id and return true on successful deletion',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article deleted',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  deleteArticle(@Query() query: GetByIdDto): Promise<boolean> {
    return this.articleService.remove(query.id);
  }
}
