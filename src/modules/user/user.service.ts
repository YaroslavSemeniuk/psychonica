import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify } from 'transliteration';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/received/create-user.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { UpdateUserDto } from './dto/received/update-user.dto';
import { SocialLink } from '../database/entities/socialLinks.entity';

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

  async createUser(data: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findOne({ name: data.name });
    if (existUser) throw new MessageCodeError('user:exist');

    const newUser = this.userRepository.create(data);
    newUser.seoId = slugify(data.name);
    if (data.socialLinks) {
      newUser.socialLinks = await this.socialLinkRepository.save(data.socialLinks);
    }
    return this.userRepository.save(newUser);
  }

  async updateUser(data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(data.id);
    if (!user) throw new MessageCodeError('user:notFound');
    if (data.name) {
      user.seoId = slugify(data.name);
    }
    if (data.socialLinks) {
      user.socialLinks = await this.socialLinkRepository.save(data.socialLinks);
    }
    Object.assign(user, data);
    await this.userRepository.save(user);
    return user;
  }

  async removeUser(id: string): Promise<boolean> {
    const deleteResponse = await this.userRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
