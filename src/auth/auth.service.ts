import {
  Injectable,
  NotFoundException,
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
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
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

    const salt = await bcrypt.genSalt(); // Gerar salt
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt); 

    const newUser = this.usersRepository.create({
      ...createUserDto,
      role: UserRole.USER,
      salt: salt, 
      password: hashedPassword, 
    });

    // Gerar o Token de confirmação de e-mail
    const confirmationToken = randomBytes(32).toString('hex');
    newUser.confirmationToken = confirmationToken;
    await this.usersRepository.save(newUser); 

    // Enviar e-mail de confirmação
    const mail = {
      to: newUser.email,
      from: 'noreply@application.com',
      subject: 'Email de confirmação',
      template: './email-confirmation', 
      context: {
        token: newUser.confirmationToken,
      },
    };
    
    try {
      await this.mailerService.sendMail(mail);
    } catch (error) {

      throw new Error('Erro ao enviar e-mail de confirmação');
    }

    return newUser;
   
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

  async confirmEmail(token: string): Promise<void> {
    const result = await this.usersRepository.update({ confirmationToken: token }, { confirmationToken: null });

    if (result.affected === 0) {
      throw new NotFoundException('Token inválido');
    }
  }

}
