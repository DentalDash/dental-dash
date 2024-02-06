import { QueryBuilder, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user.role';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { FindUsersQueryDto } from './dto/find-user.dto';


@Injectable()

export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async checkCredentials(LoginDto: LoginDto): Promise<User> {
    const { email, password } = LoginDto;
    const user = await this.findOne({ where: { email, status: true } });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
    async findUsers(queryDto: FindUsersQueryDto): Promise<{ users: User[]; total: number }> {
      queryDto.status = queryDto.status === undefined ? true : queryDto.status;
      queryDto.page = Math.max(1, queryDto.page);
      queryDto.limit = Math.min(100, Math.max(1, queryDto.limit));
      const { email, name, status, role } = queryDto;
      const query = this.createQueryBuilder('user');
      query.where('user.status = :status', { status });
  
      if (email) {
        query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
      }
  
      if (name) {
        query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
      }

      if (role) {
        query.andWhere('user.role = :role', { role });
      }
      if (typeof queryDto.page !== 'number' || typeof queryDto.limit !== 'number') {
        throw new BadRequestException('Valores de página ou limite inválidos');
      }

      query.skip((queryDto.page - 1) * queryDto.limit);
      query.take(queryDto.limit);
      query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
      query.select(['user.name', 'user.email', 'user.role', 'user.status']);
  
      const [users, total] = await query.getManyAndCount();
  
      return { users, total };
    }
  }
