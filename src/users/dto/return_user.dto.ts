import { User } from '../entities/user.entity';

export class ReturnUserDto {
  user: User;
  message: string;
}
