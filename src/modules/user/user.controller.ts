import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put, Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ROUTES } from '../../shared/config/routes';
import { GetByIdDto } from '../../shared/dto/get-by-id.dto';
import { UserDto } from '../database/dto/user.dto';

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

  @Get(':id')
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
  createUser(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
    type: UserDto,
  })
  updateUser(@Body() user: UserDto, @Param('id') id: string): Promise<UserDto> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted',
    type: UserDto,
  })
  deleteUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.removeUser(id);
  }
}
