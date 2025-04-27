import { register } from './register.controller';
import { z } from 'zod';
import { FastifyTypedInstance } from 'src/@types/fastify-type';

export async function userRoutes(app: FastifyTypedInstance) {
    app.post('/user',
        {
            schema: {
                description: 'Create a new user',
                tags: ['users'],
                body: z.object({
                    name: z.string().max(60),
                    username: z.string().max(20).trim(),
                    email: z.string().email().max(40).trim(),
                    password: z.string().min(6).max(30)
                }),
                response: {
                    201: z.object({}).describe('User created'),
                    400: z
                        .object({
                            message: z.string(),
                            issues: z.array(
                                z.object({
                                    errorCode: z.string(),
                                    field: z.string(),
                                    message: z.string()
                                })
                            )
                        })
                        .describe('Bad Request'),
                    409: z
                        .object({
                            message: z.string()
                        })
                        .describe('E-mail or username already exists'),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe('Internal Server Error')
                }
            }
        },
        register
    );
}
