import { CreateUserRequestSchemaPasswordHash } from '../utils/validators/user/create-user-schema';

type Role = 'user' | 'admin'
export type User = {
    name: string;
    id: string;
    username: string;
    email: string;
    password_hash: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
}

export interface UsersRepository {
    create(data: CreateUserRequestSchemaPasswordHash): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
}
