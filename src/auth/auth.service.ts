import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnedUserDto } from 'src/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ReturnedUserDto | null> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      return null;
    }

    const doPasswordsMatch = await bcrypt.compare(password, user.hash);

    if (doPasswordsMatch) {
      const { hash, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: ReturnedUserDto): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
