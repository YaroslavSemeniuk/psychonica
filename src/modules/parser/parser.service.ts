import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../database/entities/article.entity';
import { SheetsData } from '../database/entities/sheets.entity';

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { googleApiKey, tableId } = require('./constants/constants');
const { DatabasePublisher } = require('./helpers/databaseHelper');

@Injectable()
export class ParserService {
  constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
  ) {}

  async getDataFromTable(): Promise<SheetsData> {
    const doc = new GoogleSpreadsheet(tableId);
    doc.useApiKey(googleApiKey);

    await doc.loadInfo();
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();

    const dataFromTable = SheetsData;
    const keys = rows[1]._sheet.headerValues;

    for (let i = 1; i < rows.length; i++) {
      // const currentObject = {};
      for (let j = 0; j < keys.length; j++) {
        // currentObject[keys[j]] = rows[i][keys[j]];
        dataFromTable[keys[j]] = rows[i][keys[j]];
      }
      // dataFromTable[currentObject.id] = currentObject;
      // }
      return dataFromTable;
    }
  }

  async saveDataToDatabase(data: SheetsData): Promise<void> {
    const publisherDatabase = new DatabasePublisher();
    await publisherDatabase.sendPost(data);
  }
}
