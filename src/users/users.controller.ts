import { Controller, Get,Body, Patch, Param, Delete, Post } from '@nestjs/common';
import { ReturnUserDto } from './dto/return_user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService) {}
  
    @Post()
    async createAdminUser(
      @Body() createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {
      const user = await this.userServices.createAdminUser(createUserDto);
      return {
        user,
        message: 'Administrador cadastrado com sucesso',
      };
    }
  }