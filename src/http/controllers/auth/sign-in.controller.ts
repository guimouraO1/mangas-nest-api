import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from 'src/lib/env';
import { InvalidPasswordError } from 'src/utils/errors/invalid-password-error';
import { UserNotFound } from 'src/utils/errors/user-not-found';
import { makeAuthenticateUseCase } from 'src/use-cases/_factories/make-authenticate-use-case';
import { AuthenticateRequestBody } from 'src/utils/validators/auth/sign-in.schema';

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as AuthenticateRequestBody;

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const user = await authenticateUseCase.execute({ email, password });

        const token = await reply.jwtSign({ role: user.role }, { sign: { sub: user.id } });
        const refreshToken = await reply.jwtSign({ role: user.role }, { sign: { sub: user.id, expiresIn: env.JWT_REFRESH_TOKEN_EXPIRATION_TIME } });

        reply.setCookie(env.REFRESH_TOKEN_NAME, refreshToken, {
            path: '/',
            httpOnly: true,
            secure: env.NODE_ENV === 'production' ? true : false,
            sameSite: 'none',
            signed: true
        }).status(200).send({ token });

    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof InvalidPasswordError) {
            return reply.status(401).send({ message: error.message });
        }

        throw error;
    }
}
