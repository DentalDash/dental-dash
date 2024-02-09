import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/users/dto/login-dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/user.role';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    }

    const { ...userData } = createUserDto; // Remover passwordConfirmation dos dados do usuário

    const salt = await bcrypt.genSalt(); // Gerar salt
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt); // Gerar hash da senha com o salt

    const newUser = this.usersRepository.create({
      ...userData,
      role: UserRole.USER,
      salt: salt, // Atribuir o salt ao usuário
      password: hashedPassword, // Atribuir a senha hash ao usuário
    });

    return await this.usersRepository.save(newUser);
  }

  async signIn(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }
}
