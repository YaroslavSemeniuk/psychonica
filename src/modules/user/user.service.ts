import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/received/create-user.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { UpdateUserDto } from './dto/received/update-user.dto';
import { SocialLink } from '../database/entities/socialLinks.entity';
import { ToTranslit } from '../../shared/config/constants/transliterator.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SocialLink)
    private readonly socialLinkRepository: Repository<SocialLink>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['socialLinks'] });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id, { relations: ['socialLinks'] });
  }

  async getUserBySeoId(seoId: string): Promise<User> {
    return this.userRepository.findOne({ where: { seoId }, relations: ['socialLinks'] });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const seoId = ToTranslit(data.name);
    const user = await this.userRepository.findOne({
      where: [
        { name: data.name }, { seoId },
      ],
    });
    if (user) throw new MessageCodeError('user:exist');

    const newUser = this.userRepository.create(data);
    newUser.seoId = seoId;
    if (data.socialLinks) {
      newUser.socialLinks = await this.socialLinkRepository.save(data.socialLinks);
    }
    return this.userRepository.save(newUser);
  }

  async updateUser(data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(data.id);
    if (!user) throw new MessageCodeError('user:notFound');
    if (data.name) {
      const seoId = ToTranslit(data.name);
      const userExist = !!await this.userRepository.findOne({ seoId });
      if (userExist) throw new MessageCodeError('user:exist');
      user.seoId = seoId;
    }
    if (data.socialLinks) {
      user.socialLinks = await this.socialLinkRepository.save(data.socialLinks);
    }
    Object.assign(user, data);
    await this.userRepository.save(user);
    return user;
  }

  async removeUser(id: string): Promise<boolean> {
    const author = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.articles', 'article')
      .where('article.userId = :id', { id }).execute();
    if (author.length > 0) throw new MessageCodeError('user:isAuthor');

    const deleteResponse = await this.userRepository.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
    return !!deleteResponse.affected;
  }
}
