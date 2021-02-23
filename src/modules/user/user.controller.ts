import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put, Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ROUTES } from '../../shared/config/routes';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UserDto, ValidateUserSchema } from '../database/dto/user.dto';
import { UpdateUserDto } from './dto/received/update-user.dto';

@ApiTags(ROUTES.USER.MAIN)
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
  getUsers(): Promise<UserDto[]> {
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
  getUserById(@Query() query: GetByIdDto): Promise<UserDto> {
    return this.userService.getUserById(query.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create user and return it' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: UserDto,
  })
  createUser(@Body(new ValidationPipe(ValidateUserSchema)) user: UserDto): Promise<UserDto> {
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
  updateUser(@Body() data: UpdateUserDto): Promise<UserDto> {
    return this.userService.updateUser(data.userId, data.user);
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
