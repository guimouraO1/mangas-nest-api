import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeRegisterUseCase } from 'src/use-cases/factories/make-register-use-case';
import { UserAlreadyExistsError } from 'src/use-cases/errors/user-already-exists-error';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().max(60),
        username: z.string().max(20).trim(),
        email: z.string().email().max(40).trim(),
        password: z.string().min(6).max(30)
    });

    const { name, username, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({ name, email, password, username });

        return reply.status(201).send({});
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            reply.status(409).send({ message: error.message });
        }

        throw error;
    }
}
