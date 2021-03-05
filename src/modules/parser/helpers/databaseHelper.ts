import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../database/entities/article.entity';

export class DatabasePublisher {
  constructor(
      @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
  ) {}

  sendPost(postData: any) {
    const filteredData = this.validateData(postData);
    console.log(filteredData);
    return this.articleRepository.save(filteredData);
  }

  private validateData(data: any) {
    const returnObject = {};
    _.forEach(data, (item) => {
      if (item.id
          && item.titleText && item.descriptionText && item.descriptionTextHTML
          && item.imageSrc
          && item.categoryId && item.categoryId1 && item.categoryId2
          && item.gender
          && item.authorId) {
        returnObject[item.id] = item;
      }
    });
    return returnObject;
  }
}

module.exports = { DatabasePublisher };
