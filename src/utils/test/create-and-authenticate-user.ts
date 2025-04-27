import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import { prisma } from 'src/lib/prisma';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin?: boolean) {
    await prisma.user.create({
        data: {
            name: 'Jhon Dow',
            email: 'jhondoe@example.com',
            role: isAdmin ? 'admin' : 'user',
            password_hash: await hash('123456', 6),
            username: 'jhondoe'
        }
    });

    const authResponse = await request(app.server).post('/auth/sessions').send({
        email: 'jhondoe@example.com',
        password: '123456'
    });

    const { token } = authResponse.body;

    return { token };
}
