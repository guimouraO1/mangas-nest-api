import { CreateUserRequestSchemaPasswordHash, CreateUserRequestSchemaType } from '../../utils/validators/user/create-user-schema';
import { User, UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async create(data: CreateUserRequestSchemaPasswordHash) {
        const user: User = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            username: data.username,
            role: 'admin',
            password_hash: data.password_hash,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.items.push(user);

        return user;
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = this.items.find((item) => item.username === username);

        return user ?? null;
    }

    async findByEmail(email: string) {
        const user = this.items.find((item) => item.email === email);

        return user ?? null;
    }

    async findById(id: string) {
        const user = this.items.find((item) => item.id === id);

        return user ?? null;
    }
}
