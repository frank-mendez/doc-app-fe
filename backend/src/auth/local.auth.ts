import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('email', email);
    console.log('password', password);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
