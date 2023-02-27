import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

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
    return await this.service.register(userRegisterDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
