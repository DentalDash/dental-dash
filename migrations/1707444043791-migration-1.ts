import { UserRole } from 'src/users/user.role';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto';

export class $npmConfigName1707444043791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Creates an admin user with the password #Dm140192
    const user = {} as any;
    user.email = 'admin@dentaldash.com';
    user.name = 'Admin';
    user.role = UserRole.ADMIN;
    user.status = true;
    user.salt = await genSalt();
    user.password = await hash('#Dm140192', user.salt);
    user.confirmationToken = randomBytes(32).toString('hex');
    await queryRunner.query(
      `INSERT INTO public.users(email, name, role, status, password, salt, "confirmationToken")
      VALUES('${user.email}', '${user.name}', '${user.role}', ${user.status}, '${user.password}', '${user.salt}', '${user.confirmationToken}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM public.users WHERE email = 'admin@dentaldash.com'`,
    );
  }
}
