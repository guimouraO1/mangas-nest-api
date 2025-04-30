import { prisma } from '../../lib/prisma';
import { UsersRepository } from '../users-repository';
import { CreateUserRequestSchemaPasswordHash } from '../../utils/validators/user/create-user-schema';

export class PrismaUsersRepository implements UsersRepository {
    async findByUsername(username: string) {
        const user = await prisma.user.findUnique({ where: { username } });
        return user;
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    }

    async create(data: CreateUserRequestSchemaPasswordHash) {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password_hash: data.password_hash,
                username: data.username
            }
        });

        return user;
    }
}
