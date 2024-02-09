import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './user.role';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-user.dto';

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

  async findUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
    user: User,
  ): Promise<User> {
    // Verificar se o usuário tem permissão para atualizar com base no papel

    const userToUpdate = await this.findUserById(id);
    const { name, email, role, status } = updateUserDto;
    // Atualizar apenas os campos fornecidos no DTO
    if (name) {
      userToUpdate.name = name;
    }
    if (email) {
      userToUpdate.email = email;
    }
    if (role) {
      // Verificar se o usuário tem permissão para atribuir o papel
      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'Você não tem permissão para atribuir papéis',
        );
      }
      userToUpdate.role = role;
    }
    if (status !== undefined) {
      userToUpdate.status = status;
    }

    try {
      await userToUpdate.save();
      return userToUpdate;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteUser(userId: string) {
    const result = await this.usersRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }

  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const { email, name, status = true, role } = queryDto;
    let { page = 1, limit = 100, sort = '{"id": "DESC"}' } = queryDto;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    queryBuilder.where('user.status = :status', { status });

    if (email) {
      queryBuilder.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      queryBuilder.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
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
      'user.name',
      'user.email',
      'user.role',
      'user.status',
    ]);

    const [users, total] = await queryBuilder.getManyAndCount();

    return { users, total };
  }
}
