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

  async getArticles(): Promise<any> {
    const unsavedArticles = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), ARTICLES);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, title, description, descriptionHtml, imgSrc,
        category1, category2, category3, gender, , , authorSeoId,
      ] = row;
      const user = await this.userRepository.findOne({ where: { seoId: authorSeoId } });
      if (!user) continue;

      const categoriesIds = _.compact([category1, category2, category3]);
      let categoryId;
      const categories = [];
      for (categoryId of categoriesIds) {
        const category = await this.categoryRepository.findOne({ seoId: categoryId });
        categories.push(category);
        if (!category) break;
      }

      const object = plainToClass(CreateArticleDto, {
        title,
        description,
        descriptionHtml,
        imgSrc,
        gender,
        userId: user.id,
        categoriesIds,
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) continue;
      const article = await this.articleRepository.findOne({ seoId: ToTranslit(title) });
      if (!article) {
        await this.articleRepository.save({ ...object, seoId: ToTranslit(title), categories });
      } else unsavedArticles.push(article.seoId);
    }
    return unsavedArticles;
  }

  async getAuthors(): Promise<any> {
    const unsavedAuthors = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), AUTHORS);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, name, description, descriptionHtml, imgSrc, socialLinks, gender] = row;

      const object = plainToClass(CreateUserDto, {
        name, role: 'author', gender, imgSrc, description, descriptionHtml,
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) continue;
      const author = await this.userRepository.findOne({ seoId: ToTranslit(name) });
      if (!author) {
        await this.userRepository.save({ ...object, seoId: ToTranslit(name) });
      } else unsavedAuthors.push(author.seoId);
    }
    return unsavedAuthors;
  }

  async getCategories(): Promise<any> {
    const unsavedCategories = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), CATEGORIES);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, title, description] = row;

      const object = plainToClass(CreateCategoryDto, { title, description });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) continue;
      const category = await this.categoryRepository.findOne({ seoId: ToTranslit(title) });
      if (!category) {
        await this.categoryRepository.save({ ...object, seoId: ToTranslit(title) });
      } else unsavedCategories.push(category.seoId);
    }
    return unsavedCategories;
  }
}
