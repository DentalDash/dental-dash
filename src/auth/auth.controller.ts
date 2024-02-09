import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { LoginDto } from 'src/users/dto/login-dto';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RolesGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { GetUserId } from './auth.user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  // Create a CURL command to test the /auth/signin endpoint
  // curl -X POST http://localhost:3000/auth/signin -H "Content-Type: application/json" -d '{"email": "admin@dentaldash.com", "password": "#Dm140192"}'

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ token: string } | User> {
    try {
      const user = await this.authService.signIn(loginDto);
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        return { token: 'Token Error' };
      }
    }
  }

  @Get('/me')
  @UseGuards(RolesGuard)
  async getMe(@GetUserId() userId: string): Promise<User | string> {
    try {
      const user = await this.authService.getUserById(userId);
      return user;
    } catch (error) {
      return 'Erro ao buscar usuário';
    }
  }
}
