import { FastifyRequest, FastifyReply } from 'fastify';
import { env } from 'src/lib/env';
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from 'src/use-cases/factories/make-authenticate-use-case';
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
        if (error instanceof InvalidCredentialsError) {
            return reply.status(401).send({ message: error.message });
        }

        throw error;
    }
}
