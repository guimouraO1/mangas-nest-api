import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../users/authenticate';

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    return authenticateUseCase;
}
