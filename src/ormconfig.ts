import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'dental_dash',
  entities: [User],
  synchronize: true,
};
