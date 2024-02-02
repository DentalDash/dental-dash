import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/user.role';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password !== createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        }

        const { passwordConfirmation, ...userData } = createUserDto; // Remover passwordConfirmation dos dados do usuário

        const salt = await bcrypt.genSalt(); // Gerar salt
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt); // Gerar hash da senha com o salt

        const newUser = this.usersRepository.create({
            ...userData,
            role: UserRole.USER,
            salt: salt, // Atribuir o salt ao usuário
            password: hashedPassword, // Atribuir a senha hash ao usuário
        });

        return await this.usersRepository.save(newUser);
    }
}
