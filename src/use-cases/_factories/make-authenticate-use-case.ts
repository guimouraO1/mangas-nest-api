import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../auth/authenticate';

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    return authenticateUseCase;
}
