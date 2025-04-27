import { FastifyRequest, FastifyReply } from 'fastify';
import { makeRegisterUseCase } from 'src/use-cases/_factories/make-register-use-case';
import { CreateUserRequestSchemaType } from 'src/utils/validators/user/create-user-schema';
import { UsernameAlreadyRegistredError } from 'src/utils/errors/username-already-registred-error';
import { EmailAlreadyRegistredError } from 'src/utils/errors/email-already-registred-error';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const { name, username, email, password } = request.body as CreateUserRequestSchemaType;

    try {
        const registerUseCase = makeRegisterUseCase();
        await registerUseCase.execute({ name, email, password, username });

        return reply.status(201).send({});
    } catch (error) {
        if (error instanceof UsernameAlreadyRegistredError) {
            reply.status(409).send({ message: error.message });
        }

        if (error instanceof EmailAlreadyRegistredError) {
            reply.status(409).send({ message: error.message });
        }

        throw error;
    }
}
