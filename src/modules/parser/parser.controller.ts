import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body, Controller, Get, HttpStatus, Post, UsePipes,
} from '@nestjs/common';
import { ROUTES } from '../../shared/config/routes';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { ParserService } from './parser.service';

@ApiTags(ROUTES.PARSER.MAIN)
@Controller(ROUTES.PARSER.MAIN)
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

    @Get(ROUTES.PARSER.GET_DATA_FROM_TABLE)
    @ApiOperation({ summary: 'Get data from table', description: 'titleText: Article name' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Data obtained',
    })
  getDataFromTable(): Promise<void> {
    return this.parserService.getDataFromTable();
  }

  // @Post(ROUTES.PARSER.SAVE_TABLE_DATA_TO_DB)
  // @ApiOperation({ summary: 'Send data to DB from table', description: 'Send data to DB from table' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Data saved',
  //   type: Boolean,
  // })
  // @UsePipes(new ValidationPipe())
  // saveDataToDatabase(@Body() data: SheetsData): Promise<void> {
  //   return this.parserService.saveDataToDatabase(data);
  // }
}
