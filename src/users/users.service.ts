import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './user.role';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersQueryDto } from './dto/find-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

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
    try {
      return await this.usersRepository.findUsers(queryDto);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erro ao buscar os usuários');
    }
  }
}
