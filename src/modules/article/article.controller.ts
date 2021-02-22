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
import { ArticleService } from './article.service';
import { ROUTES } from '../../shared/config/routes';
import { GetByGenderAndCategoryDto } from './dto/received/get-by-gender-and-category.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByGenderDto } from './dto/received/get-by-gender.dto';
import { GetByCategoryDto } from './dto/received/get-by-category.dto';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { CreateArticleDto } from './dto/received/create-article.dto';
import { ArticleDto } from '../database/dto/article.dto';
import { UpdateArticleDto } from './dto/received/update-article.dto';

@ApiTags(ROUTES.ARTICLE.MAIN)
@Controller(ROUTES.ARTICLE.MAIN)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  getArticles(): Promise<ArticleDto[]> {
    return this.articleService.getAll();
  }

  @Get(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticleById(@Query() query: GetByIdDto): Promise<ArticleDto> {
    return this.articleService.getById(query.id);
  }

  @Get(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByUserId(@Query() query: GetByIdDto): Promise<ArticleDto[]> {
    return this.articleService.getArticlesByUserId(query.id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Article created',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  createArticle(@Body() data: CreateArticleDto): Promise<ArticleDto> {
    return this.articleService.createOne(data.article);
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article updated',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  updateArticle(@Body() data: UpdateArticleDto): Promise<ArticleDto> {
    return this.articleService.update(data.articleId, data.article);
  }

  @Delete(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article deleted',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  deleteArticle(@Query() query: GetByIdDto): Promise<boolean> {
    return this.articleService.remove(query.id);
  }

  @Get(ROUTES.ARTICLE.GET_BY_CATEGORY)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByCategory(@Query() query: GetByCategoryDto): Promise<ArticleDto[]> {
    return this.articleService.getArticlesByCategory(query.name);
  }

  @Get(ROUTES.ARTICLE.GET_BY_GENDER)
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: ArticleDto,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByGenderAndCategory(@Query() query: GetByGenderAndCategoryDto): Promise<ArticleDto[]> {
    return this.articleService.getArticlesByGenderAndCategory(query.gender, query.category);
  }
}
