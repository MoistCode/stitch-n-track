import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReturnedUserDto } from 'src/user/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    email: string,
    password: string,
  ): Promise<ReturnedUserDto | null> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException({ error: 'Unauthorized' });
    }

    return user;
  }
}
