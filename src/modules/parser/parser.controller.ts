import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ROUTES } from '../../shared/config/routes';
import { ParserService } from './parser.service';
import { validationResponseType } from '../../types/parser-service/validation-response.type';

@ApiTags(ROUTES.PARSER.MAIN)
@Controller(ROUTES.PARSER.MAIN)
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

    @Get(ROUTES.PARSER.GET_ARTICLES_FROM_TABLE)
    @ApiOperation({
      summary: 'Get articles from table',
      description: 'Save articles from Google SpreadSheets to DB',
    })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Data obtained',
    })
  getArticlesFromTable(): Promise<validationResponseType[]> {
    return this.parserService.getArticles();
  }

  @Get(ROUTES.PARSER.GET_AUTHORS_FROM_TABLE)
  @ApiOperation({
    summary: 'Get authors from table',
    description: 'Save authors from Google SpreadSheets to DB',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data obtained',
  })
    getAuthorsFromTable(): Promise<validationResponseType[]> {
      return this.parserService.getAuthors();
    }

  @Get(ROUTES.PARSER.GET_CATEGORIES_FROM_TABLE)
  @ApiOperation({
    summary: 'Get categories from table',
    description: 'Save categories from Google SpreadSheets to DB',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Data obtained',
  })
  getCategoriesFromTable(): Promise<validationResponseType[]> {
    return this.parserService.getCategories();
  }
}
