import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put, Query, UsePipes,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { Article } from '../database/entities/article.entity';
import { ROUTES } from '../../shared/config/routes';
import { GetByGenderAndCategoryDto } from './dto/get-by-gender-and-category.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { GetByGenderDto } from './dto/get-by-gender.dto';
import { GetByCategoryDto } from './dto/get-by-category.dto';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags(ROUTES.ARTICLE.MAIN)
@Controller(ROUTES.ARTICLE.MAIN)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  getArticles(): Promise<Article[]> {
    return this.articleService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article was found',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  getArticleById(@Query() query: GetByIdDto): Promise<Article> {
    return this.articleService.getById(query.id);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByAuthorId(@Query() query: GetByIdDto): Promise<Article[]> {
    return this.articleService.getArticlesByAuthorId(query.id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Article created',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  createArticle(@Query() query: UpdateArticleDto): Promise<Article> {
    return this.articleService.createOne(query.idUser, query.article);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article updated',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  updateArticle(@Query() query: UpdateArticleDto): Promise<Article> {
    return this.articleService.update(query.idUser, query.article);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article deleted',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  deleteArticle(@Query() query: GetByIdDto): Promise<Article> {
    return this.articleService.remove(query.id);
  }

  @Get('/getByCategory/:category')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByCategory(@Query() query: GetByCategoryDto): Promise<Article[]> {
    return this.articleService.getArticlesByCategory(query.category);
  }

  @Get('/getByGender/:gender')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByGender(@Query() query: GetByGenderDto): Promise<Article[]> {
    return this.articleService.getArticlesByGender(query.gender);
  }

  @Get('/getByGenderAndCategory')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByGenderAndCategory(@Query() query: GetByGenderAndCategoryDto): Promise<Article[]> {
    return this.articleService.getArticlesByGenderAndCategory(query.gender, query.category);
  }
}
