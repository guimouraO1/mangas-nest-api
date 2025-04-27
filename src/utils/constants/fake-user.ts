import { User } from '@prisma/client';

export const FAKE_USER: User = {
    name: 'user',
    id: 'user_id',
    username: 'user',
    email: 'user@email.com',
    password_hash: '$2y$06$tcDZnh76jFgznldvHqA2kuwK4e47DoL/7geTjjzWV/3.SD1LcJU6q', // admin 123
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'user'
};

export const FAKE_USER_SIGN_IN = {
    email: 'user@email.com',
    password: 'admin123'
};

export const FAKE_ADMIN: User = {
    name: 'admin',
    id: 'admin_id',
    username: 'admin',
    email: 'admin@email.com',
    password_hash: '$2y$06$tcDZnh76jFgznldvHqA2kuwK4e47DoL/7geTjjzWV/3.SD1LcJU6q', // admin 123
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'admin'
};

export const FAKE_ADMIN_SIGN_IN = {
    email: 'admin@email.com',
    password: 'admin123'
};