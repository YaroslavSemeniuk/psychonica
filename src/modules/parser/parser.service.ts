import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _ from 'lodash';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Article } from '../database/entities/article.entity';
import { getSheet } from '../../shared/helpers/google-sheet.helper';
import { configService } from '../../shared/config/config.service';
import { CreateArticleDto } from '../article/dto/received/create-article.dto';
import { User } from '../database/entities/user.entity';

@Injectable()
export class ParserService {
  constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {}

  async getDataFromTable():Promise<void> {
    await this.getArticles();
  }

  private async getArticles():Promise<void> {
    let sheetData = await getSheet(configService.getCustomKey('GOOGLE_SPREDSHEET_ID'), 'Статьи');
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [seoId, title, description, descriptionHtml, imgSrc, category1, category2, category3, gender, , , authorSeoId] = row;
      const user = await this.userRepository.findOne({ where: { seoId: authorSeoId } });
      if (!user) continue;
      const object = plainToClass(CreateArticleDto, {
        title, description, descriptionHtml, imgSrc, gender, userId: user.id,
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) continue;
      await this.articleRepository.create({ ...object, seoId });
    }
  }
}
