import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Version,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

const saltOrRounds = 10;

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Version('1')
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    let hash;

    try {
      hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    } catch (err) {
      console.error(err);
    }

    if (!hash) {
      throw new BadRequestException({ error: 'User could not be created.' });
    }

    const createData = {
      email: createUserDto.email,
      hash,
    };

    let user;

    try {
      user = await this.userService.create(createData);
    } catch (err) {
      console.error(err);
    }

    if (!user) {
      throw new BadRequestException({ error: 'User could not be created.' });
    }

    return this.authService.login(user);
  }
}
