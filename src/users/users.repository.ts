import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { DataSource, EntityManager, Repository } from 'typeorm';

import { FindUsersQueryDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  private entityManager: EntityManager;

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
