import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() userRegisterDto: UserRegisterDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, salt);
    userRegisterDto.password = hashedPassword;

    try {
      return await this.service.register(userRegisterDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    try {
      const user = await this.service.findOne(userLoginDto.email);

      if (user) {
        const isMatch = await bcrypt.compare(
          userLoginDto.password,
          user.password,
        );
        if (isMatch) {
          const token = this.jwtService.sign(
            { id: user.email },
            { secret: process.env.JWT_SECRET, expiresIn: '1d' },
          );
          return token;
        } else {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
