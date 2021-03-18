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
import { RoleEnum } from '../../shared/enums/role.enum';
import { ReasonEnum } from '../../shared/enums/reason.enum';
import { validationResponseType } from '../../types/parser-service/validation-response.type';

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

  async getArticles(): Promise<validationResponseType[]> {
    const unsavedArticles = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), ARTICLES);

    sheetData = _.slice(sheetData, 2, sheetData.length);
    for (const row of sheetData) {
      const [title, description, descriptionHtml, imgSrc,
        category1, category2, category3, gender, , , authorSeoId,
      ] = row;
      if (!authorSeoId) continue;

      const user = await this.userRepository.findOne({ where: { seoId: authorSeoId } });
      if (!user) {
        unsavedArticles.push({ title, reason: ReasonEnum.USER_NOT_FOUND });
        continue;
      }

      const categoriesSeoIds = _.compact([category1, category2, category3]);
      if (_.isEmpty(categoriesSeoIds)) {
        unsavedArticles.push({ title, reason: ReasonEnum.CATEGORY_NOT_FOUND });
        continue;
      }
      const categories = await this.categoryRepository.createQueryBuilder('category')
        .where('category.seoId IN (:...categoriesSeoIds)', { categoriesSeoIds }).getMany();
      if (categories.length !== categoriesSeoIds.length) {
        unsavedArticles.push({
          title, reason: ReasonEnum.CATEGORY_NOT_FOUND,
        });
      }

      const object = plainToClass(CreateArticleDto, {
        title,
        description,
        descriptionHtml,
        imgSrc,
        gender,
        userId: user.id,
        categoriesIds: categories.map((category) => category.id),
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) {
        unsavedArticles.push({
          title, reason: errorsList,
        });
        continue;
      }
      const seoId = ToTranslit(title);
      const article = await this.articleRepository.findOne({ seoId });
      if (!article) {
        await this.articleRepository.save({ ...object, seoId, categories });
      } else {
        await this.articleRepository.save({
          id: article.id, ...object, seoId, categories,
        });
      }
    }
    return unsavedArticles;
  }

  async getAuthors(): Promise<validationResponseType[]> {
    const unsavedAuthors = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), AUTHORS);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [name, description, descriptionHtml, imgSrc, socialLinks, gender] = row;

      const object = plainToClass(CreateUserDto, {
        name, role: RoleEnum.AUTHOR, gender, imgSrc, description, descriptionHtml,
      });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) {
        unsavedAuthors.push({
          name, reason: errorsList,
        });
        continue;
      }
      const seoId = ToTranslit(name);
      const author = await this.userRepository.findOne({ seoId });
      if (!author) {
        await this.userRepository.save({ ...object, seoId });
      } else {
        await this.userRepository.createQueryBuilder()
          .update(User)
          .set({ ...object, seoId }).where({ id: author.id })
          .execute();
      }
    }
    return unsavedAuthors;
  }

  async getCategories(): Promise<validationResponseType[]> {
    const unsavedCategories = [];
    let sheetData = await getSheet(configService.getCustomKey(GOOGLE_SPREADSHEET_ID), CATEGORIES);
    sheetData = _.slice(sheetData, 2, sheetData.length);

    for (const row of sheetData) {
      const [title, description] = row;

      const object = plainToClass(CreateCategoryDto, { title, description });
      const errorsList = await validate(object, { whitelist: true });
      if (errorsList.length) {
        unsavedCategories.push({
          title, reason: errorsList,
        });
        continue;
      }
      const seoId = ToTranslit(title);
      const category = await this.categoryRepository.findOne({ seoId });
      if (!category) {
        await this.categoryRepository.save({ ...object, seoId });
      } else {
        unsavedCategories.push({
          title, reason: ReasonEnum.CATEGORY_EXIST,
        });
      }
    }
    return unsavedCategories;
  }
}
