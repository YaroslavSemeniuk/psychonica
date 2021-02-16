import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
    return await this.userRepository.findOne(id);
  }

  async createUser(data: User): Promise<User> {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne(id);
  }

  async removeUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    const deleteResponse = await this.userRepository.delete(user);
    if (deleteResponse.affected) {
      return user;
    }
  }
}
