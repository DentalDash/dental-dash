import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './user.role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const createUser = new User();

      const salt = await bcrypt.genSalt();

      createUser.email = createUserDto.email;
      createUser.name = createUserDto.name;
      createUser.role = UserRole.ADMIN;
      createUser.status = true;
      createUser.salt = salt;
      createUser.password = await bcrypt.hash(createUserDto.password, salt);
      createUser.confirmationToken = crypto.randomBytes(32).toString('hex');

      return this.usersRepository.save(createUser);
    }
  }
}
