import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtRequestPayload, JwtResponsePayload } from './types/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SIGNING_KEY,
    });
  }

  validate(payload: JwtResponsePayload): JwtRequestPayload {
    return { userId: payload.sub, email: payload.email };
  }
}
