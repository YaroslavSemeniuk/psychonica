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
import { CreateUserDto } from '../user/dto/received/create-user.dto';
import { CreateCategoryDto } from '../category/dto/received/create-category.dto';
import { Category } from '../database/entities/category.entity';
import {
  ARTICLES, AUTHORS, CATEGORIES, GOOGLE_SPREADSHEET_ID,
} from '../../shared/config/constants/google-spreadsheet';
import { ToTranslit } from '../../shared/config/constants/transliterator.helper';

@Injectable()
export class ParserService {
  constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
  ) {
  }

  async getArticles(): Promise<any[]> {
    const unsavedArticles = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), ARTICLES);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, title, description, descriptionHtml, imgSrc,
        category1, category2, category3, gender, , , authorSeoId,
      ] = row;
      const user = await this.userRepository.findOne({ where: { seoId: authorSeoId } });
      if (!user) {
        unsavedArticles.push(_.compact(row)[0]);
        continue;
      }

      const categoriesSeoIds = _.compact([category1, category2, category3]);
      const categories = [];
      let checkSuccess;
      for (const categoryId of categoriesSeoIds) {
        const existCategory = await this.categoryRepository.findOne({ seoId: categoryId });
        categories.push(existCategory);
        checkSuccess = true;
        if (!existCategory) {
          checkSuccess = false;
        }
      }

      if (checkSuccess) {
        unsavedArticles.push(row[0]);
        continue;
      }

      const object = plainToClass(CreateArticleDto, {
        title,
        description,
        descriptionHtml,
        imgSrc,
        gender,
        userId: user.id,
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) continue;
      const existArticle = await this.articleRepository.findOne({ seoId: ToTranslit(title) });
      if (!existArticle) {
        await this.articleRepository.save({ ...object, seoId: ToTranslit(title), categories });
      }
    }
    return unsavedArticles;
  }

  async getAuthors(): Promise<void> {
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), AUTHORS);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, name, description, descriptionHtml, imgSrc, socialLinks, gender] = row;

      const object = plainToClass(CreateUserDto, {
        name, role: 'author', gender, imgSrc, description, descriptionHtml,
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) continue;
      const existAuthor = await this.userRepository.findOne({ seoId: ToTranslit(name) });
      if (!existAuthor) {
        await this.userRepository.save({ ...object, seoId: ToTranslit(name) });
      }
    }
  }

  async getCategories(): Promise<void> {
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), CATEGORIES);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, title, description] = row;

      const object = plainToClass(CreateCategoryDto, { title, description });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) continue;
      const existCategory = await this.categoryRepository.findOne({ seoId: ToTranslit(title) });
      if (!existCategory) {
        await this.categoryRepository.save({ ...object, seoId: ToTranslit(title) });
      }
    }
  }
}
