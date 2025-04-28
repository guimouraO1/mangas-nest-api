
import { FastifyReply, FastifyRequest } from 'fastify';
import { env } from 'src/lib/env';

export function errorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
    if (error.validation) {
        return reply.status(400).send({
            message: 'Bad request',
            status: 400,
            errors: error.message
        });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return reply.status(500).send({ message: 'Internal Server Error' });
}
