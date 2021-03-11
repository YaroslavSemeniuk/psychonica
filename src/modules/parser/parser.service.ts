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
    const userNotFound = [];
    const categoryNotFound = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), ARTICLES);

    sheetData = _.slice(sheetData, 2, sheetData.length);
    for (const row of sheetData) {
      const [, title, description, descriptionHtml, imgSrc,
        category1, category2, category3, gender, , , authorSeoId,
      ] = row;
      const user = await this.userRepository.findOne({ where: { seoId: authorSeoId } });
      if (!user) {
        userNotFound.push(authorSeoId);
        continue;
      }

      const categoriesIds = _.compact([category1, category2, category3]);
      const categories = [];
      let categoryId;
      for (categoryId of categoriesIds) {
        const category = await this.categoryRepository.findOne({ seoId: categoryId });
        categories.push(category);
        if (!category) {
          categoryNotFound.push(categoryId);
        }
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
    unsavedArticles.push(_.compact(userNotFound), _.compact(categoryNotFound));
    return unsavedArticles;
  }

  async getAuthors(): Promise<any> {
    const unsavedAuthors = [];
    const validationError = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), AUTHORS);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, name, description, descriptionHtml, imgSrc, socialLinks, gender] = row;

      const object = plainToClass(CreateUserDto, {
        name, role: 'author', gender, imgSrc, description, descriptionHtml,
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) {
        validationError.push(ToTranslit(object.name));
        continue;
      }
      const seoId = ToTranslit(name);
      const author = await this.userRepository.findOne({ seoId });
      if (!author) {
        await this.userRepository.save({ ...object, seoId });
      } else unsavedAuthors.push(author.seoId);
    }
    unsavedAuthors.push(_.compact(validationError));
    return unsavedAuthors;
  }

  async getCategories(): Promise<any> {
    const unsavedCategories = [];
    const validationError = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), CATEGORIES);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [, title, description] = row;

      const object = plainToClass(CreateCategoryDto, { title, description });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) {
        validationError.push(ToTranslit(object.title));
        continue;
      }
      const seoId = ToTranslit(title);
      const category = await this.categoryRepository.findOne({ seoId });
      if (!category) {
        await this.categoryRepository.save({ ...object, seoId });
      } else unsavedCategories.push(category.seoId);
    }
    unsavedCategories.push(_.compact(validationError));
    return unsavedCategories;
  }
}
