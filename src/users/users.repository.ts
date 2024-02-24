import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersQueryDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './user.role';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

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

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const { email, name, status = true, role } = queryDto;
    let { page = 1, limit = 100, sort = '{"id": "DESC"}' } = queryDto;
    const queryBuilder = this.createQueryBuilder('users');

    queryBuilder.where('users.status = :status', { status });

    if (email) {
      queryBuilder.andWhere('users.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    if (name) {
      queryBuilder.andWhere('users.name ILIKE :name', { name: `%${name}%` });
    }

    if (role) {
      queryBuilder.andWhere('users.role = :role', { role });
    }

    page = page < 1 ? 1 : page;

    limit = limit > 100 ? 100 : limit;

    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    try {
      sort = JSON.parse(sort);
      queryBuilder.orderBy(sort);
    } catch (error) {
      console.error(error);
      throw new UnprocessableEntityException(
        'Invalid sort attribute provided, must be a valid JSON object with the format `{ "field": "ASC|DESC" }`',
      );
    }

    queryBuilder.select([
      'users.name',
      'users.email',
      'users.role',
      'users.status',
    ]);

    const [users, total] = await queryBuilder.getManyAndCount();

    return { users, total };
  }
}
