import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import md5 from 'md5';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() user: User) {
    const newUser = await this.userService.createUser({
      ...user,
      password: md5(user.password),
    });
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const user = await this.userService.findOne(id);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }
}
