import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto): Promise<any> {
    const { username, password } = authDto;
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return user;
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user._id,
      fullName: user.fullName,
    };
    return {
      access_token: this.jwtService.sign(payload),
      ...payload,
    };
  }
}
