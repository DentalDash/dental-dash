import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';

import { RolesGuard } from '../auth/auth.guard';
import { Role } from '../auth/auth.role';
import { UserRole } from './user.role';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserId } from 'src/auth/auth.user';
import { User } from './entities/user.entity';
import { FindUsersQueryDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
}

@Patch(':id')
async updateUser(
  @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  @GetUserId() user: User,
  @Param('id') id: string,
) {
  try {
    const updatedUser = await this.usersService.updateUser(updateUserDto, id, user);
    return updatedUser;
  } catch (error) {
    if (error instanceof ForbiddenException) {
      throw error; // Repassa a exceção ForbiddenException diretamente
    } else {
      console.log(error);
    
      throw new InternalServerErrorException('Erro ao atualizar o usuário');
    }
  }
}
  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
   await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
  };
}
@Get()
  @Role(UserRole.ADMIN)
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.usersService.findUsers(query);
    return {
      found,
      message: 'Usuários encontrados',
    };
  }
}