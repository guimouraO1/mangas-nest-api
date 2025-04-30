import { compare } from 'bcryptjs';
import { UsersRepository } from '../../repositories/users-repository';
import { AuthenticateRequestBody } from '../../utils/validators/auth/sign-in.schema';
import { UserNotFound } from '../../utils/errors/user-not-found';
import { InvalidPasswordError } from '../../utils/errors/invalid-password-error';

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateRequestBody) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFound();
        }

        const doesPasswordMathes = await compare(password, user.password_hash);
        if (!doesPasswordMathes) {
            throw new InvalidPasswordError();
        }

        return user;
    }
}
