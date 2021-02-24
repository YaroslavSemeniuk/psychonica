import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query, UseInterceptors, UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ROUTES } from '../../shared/config/routes';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UserDto } from '../database/dto/user.dto';
import { UpdateUserDto } from './dto/received/update-user.dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/received/create-user.dto';
import { TransformInterceptor } from '../../shared/interceprots/transform.interceptor';

@ApiTags(ROUTES.USER.MAIN)
// @UseInterceptors(TransformInterceptor)
@Controller(ROUTES.USER.MAIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(ROUTES.USER.GET_ALL)
  @ApiOperation({ summary: 'Return all users', description: 'Return all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users was found',
    type: UserDto,
  })
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(ROUTES.USER.GET_BY_ID)
  @ApiOperation({ summary: 'Return user by id', description: 'Return user by input id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User was found',
    type: UserDto,
  })
  @UsePipes(new ValidationPipe())
  getUserById(@Query() query: GetByIdDto): Promise<User> {
    return this.userService.getUserById(query.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create user and return it' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: CreateUserDto,
  })
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put()
  @ApiOperation({ summary: 'Update user', description: 'Update user and return it' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
    type: UserDto,
  })
  @UsePipes(new ValidationPipe())
  updateUser(@Body() data: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(data);
  }

  @Delete()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted',
    type: UserDto,
  })
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user by id and return true on successful deletion',
  })
  @UsePipes(new ValidationPipe())
  deleteUser(@Query() query: GetByIdDto): Promise<boolean> {
    return this.userService.removeUser(query.id);
  }
}
