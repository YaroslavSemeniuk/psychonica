import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const existUser = await this.userRepository.findOne({ email: data.email });
    if (existUser) throw new MessageCodeError('user:exist');

    return this.userRepository.create(data);
  }

  async updateUser(data: UpdateUserDto): Promise<User> {
    // console.log({ user });
    // console.log({ ...user });
    return this.userRepository.save({ id: data.userId, ...data });
  }

  async removeUser(id: string): Promise<boolean> {
    const deleteResponse = await this.userRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
