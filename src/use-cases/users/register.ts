import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/repositories/users-repository';
import { CreateUserRequestSchemaType } from 'src/utils/validators/user/create-user-schema';
import { UsernameAlreadyRegistredError } from '../../utils/errors/username-already-registred-error';
import { EmailAlreadyRegistredError } from '../../utils/errors/email-already-registred-error';

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password, username }: CreateUserRequestSchemaType) {
        const emailAlreadyRegistred = await this.usersRepository.findByEmail(email);
        if (emailAlreadyRegistred) {
            throw new EmailAlreadyRegistredError();
        }

        const usernameAlreadyRegistred = await this.usersRepository.findByUsername(username);
        if (usernameAlreadyRegistred) {
            throw new UsernameAlreadyRegistredError();
        }

        const password_hash = await hash(password, 6);
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
            username
        });

        return user;
    }
}
