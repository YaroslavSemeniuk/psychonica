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
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  getArticles(): Promise<Article[]> {
    return this.articleService.getAll();
  }

  @Get(':id')
  getArticleById(@Param('id') id: string): Promise<Article> {
    return this.articleService.getById(id);
  }

  @Get(':id')
  getArticlesByAuthorId(
    @Param('authorId') authorId: string,
  ): Promise<Article[]> {
    return this.articleService.getArticlesByAuthorId(authorId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArticle(@Body() article: Article): Promise<Article> {
    return this.articleService.createOne(article);
  }

  @Put(':id')
  updateArticle(
    @Body() article: Article,
    @Param('id') id: string,
  ): Promise<Article> {
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.remove(id);
  }

  @Get(':category')
  getArticlesByCategory(
    @Param('category') category: string,
  ): Promise<Article[]> {
    return this.articleService.getArticlesByCategory(category);
  }

  @Get(':gender')
  getArticlesByGender(@Param('gender') gender: string): Promise<Article[]> {
    return this.articleService.getArticlesByGender(gender);
  }

  @Get(':category')
  getArticlesByGenderAndCategory(
    @Param('gender') gender: string,
    @Param('category') category: string,
  ): Promise<Article[]> {
    return this.articleService.getArticlesByGenderAndCategory(gender, category);
  }
}
