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
import { GetByParamsDto } from './dto/get-by-params.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

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
  getArticles(): Promise<Article[]> {
    return this.articleService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article was found',
    type: Article,
  })
  getArticleById(@Param('id') id: string): Promise<Article> {
    return this.articleService.getById(id);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  getArticlesByAuthorId(
    @Param('authorId') authorId: string,
  ): Promise<Article[]> {
    return this.articleService.getArticlesByAuthorId(authorId);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Article created',
    type: Article,
  })
  createArticle(@Body() article: Article): Promise<Article> {
    return this.articleService.createOne(article);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article updated',
    type: Article,
  })
  updateArticle(
    @Body() article: Article,
    @Param('id') id: string,
  ): Promise<Article> {
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Article deleted',
    type: Article,
  })
  deleteArticle(@Param('id') id: string): Promise<Article> {
    return this.articleService.remove(id);
  }

  @Get('/getByCategory/:category')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  getArticlesByCategory(
    @Param('category') category: string,
  ): Promise<Article[]> {
    return this.articleService.getArticlesByCategory(category);
  }

  @Get('/getByGender/:gender')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })

  getArticlesByGender(@Param() params: string): Promise<Article[]> {
    return this.articleService.getArticlesByGender(params);
  }

  @Get('/getByGenderAndCategory')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles was found',
    type: Article,
  })
  @UsePipes(new ValidationPipe())
  getArticlesByGenderAndCategory(
      @Query() query: GetByParamsDto,
        // @Query('gender') gender: string, // или перед методом
        // @Query('category') category: string,
  ): Promise<Article[]> {
    return this.articleService.getArticlesByGenderAndCategory(query.gender, query.category);
  }
}
