import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../database/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ROUTES } from '../../shared/config/routes';

@ApiTags(ROUTES.USER.MAIN)
@Controller(ROUTES.USER.MAIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users was found',
    type: User,
  })
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User was found',
    type: User,
  })
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: User,
  })
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
    type: User,
  })
  updateUser(@Body() user: User, @Param('id') id: string): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted',
    type: User,
  })
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.removeUser(id);
  }
}
