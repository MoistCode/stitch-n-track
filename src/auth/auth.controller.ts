import {
  Controller,
  Request,
  Post,
  UseGuards,
  Version,
  Get,
} from '@nestjs/common';
import { ReturnedUserDto } from 'src/user/dto';
import { JwtRequestPayload } from './types/auth';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Version('1')
  @Post('auth/login')
  async login(@Request() req: { user: ReturnedUserDto }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Version('1')
  @Get('profile')
  getProfile(@Request() req: { user: JwtRequestPayload }) {
    return req.user;
  }
}
