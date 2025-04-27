import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from 'src/lib/env';

export async function signOut(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({ onlyCookie: true });
        return reply.clearCookie(env.REFRESH_TOKEN_NAME).status(200).send({});
    } catch {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
}
