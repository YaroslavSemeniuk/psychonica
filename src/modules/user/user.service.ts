import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { UserDto } from '../database/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserDto> {
    return this.userRepository.findOne(id);
  }

  async createUser(data: UserDto): Promise<UserDto> {
    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: string, user: UserDto): Promise<UserDto> {
    return this.userRepository.save({ id, user });
  }

  async removeUser(id: string): Promise<boolean> {
    let deletedResult = false;
    const user = await this.userRepository.findOne(id);
    const deleteResponse = await this.userRepository.delete(user);
    if (deleteResponse.affected) {
      deletedResult = true;
    }
    return deletedResult;
  }
}
