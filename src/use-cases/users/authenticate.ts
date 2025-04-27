import { compare } from 'bcryptjs';
import { UsersRepository } from '../../repositories/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { AuthenticateRequestBody } from 'src/utils/validators/auth/sign-in.schema';

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateRequestBody) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMathes = await compare(password, user.password_hash);

        if (!doesPasswordMathes) {
            throw new InvalidCredentialsError();
        }

        return user;
    }
}
