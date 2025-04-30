import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from '../../../lib/env';

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({ onlyCookie: true });

        const { role } = request.user;

        const token = await reply.jwtSign({ role }, { sign: { sub: request.user.sub } });
        const refreshToken = await reply.jwtSign({ role },{ sign: { sub: request.user.sub, expiresIn: env.JWT_REFRESH_TOKEN_EXPIRATION_TIME } });

        reply.setCookie(env.REFRESH_TOKEN_NAME, refreshToken, {
            path: '/',
            httpOnly: true,
            secure: env.NODE_ENV === 'production' ? true : false,
            sameSite: 'none',
            signed: true
        }).status(200).send({ token });
    } catch (error: any) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
}
