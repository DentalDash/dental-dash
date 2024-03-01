import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbConfig = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'dental_dash',
  username: 'pguser',
  password: 'pgpassword',
  logging: true,
  synchronize: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
  entities: ['dist/entity/**/*.js'],
});

export const AppDataSource = new DataSource(dbConfig());

export const createDBIfNotExists = async (): Promise<void> => {
  const dbOptions = dbConfig();
  const { database } = dbOptions;

  const dataSource = new DataSource({
    ...dbOptions,
    database: 'postgres',
  });

  await dataSource.initialize();

  const result = await dataSource.query(
    `SELECT 1 FROM pg_database WHERE datname = '${database}'`,
  );

  if (!result.length) {
    console.log(`Creating database with name "${database}"`);
    await dataSource.query(`CREATE DATABASE "${database}"`);
  }

  await dataSource.destroy();
};
