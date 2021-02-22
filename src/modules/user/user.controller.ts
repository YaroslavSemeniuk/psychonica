import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ROUTES } from '../../shared/config/routes';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UserDto } from '../database/dto/user.dto';
import { CreateUserDto } from './dto/received/create-user.dto';
import { UpdateUserDto } from './dto/received/update-user.dto';

@ApiTags(ROUTES.USER.MAIN)
@Controller(ROUTES.USER.MAIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users was found',
    type: UserDto,
  })
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User was found',
    type: UserDto,
  })
  @UsePipes(new ValidationPipe())
  getUserById(@Query() query: GetByIdDto): Promise<UserDto> {
    return this.userService.getUserById(query.id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: UserDto,
  })
  @UsePipes(new ValidationPipe())
  createUser(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(data.user);
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
    type: UserDto,
  })
  @UsePipes(new ValidationPipe())
  updateUser(@Body() data: UpdateUserDto): Promise<UserDto> {
    return this.userService.updateUser(data.userId, data.user);
  }

  @Delete(ROUTES.ID.DYNAMIC_ID)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted',
    type: UserDto,
  })
  @UsePipes(new ValidationPipe())
  deleteUser(@Query() query: GetByIdDto): Promise<boolean> {
    return this.userService.removeUser(query.id);
  }
}
