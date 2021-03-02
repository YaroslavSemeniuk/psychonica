import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify } from 'transliteration';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/received/create-user.dto';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { UpdateUserDto } from './dto/received/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findOne({ name: data.name });
    if (existUser) throw new MessageCodeError('user:exist');

    const newUser = this.userRepository.create(data);
    newUser.seoId = slugify(data.name);
    return this.userRepository.save(newUser);
  }

  async updateUser(data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(data.id);
    if (!user) throw new MessageCodeError('user:notFound');
    Object.assign(user, data);
    await this.userRepository.save(user);
    return user;
  }

  async removeUser(id: string): Promise<boolean> {
    const deleteResponse = await this.userRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
