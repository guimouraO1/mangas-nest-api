import { AuthenticateRequestBodyZod } from 'src/utils/validators/auth/sign-in.schema';
import { FastifyTypedInstance } from '../../../@types/fastify-type';
import { BadRequestSchema } from 'src/utils/validators/errors/bad-request-schema';
import { InternalServerErrorSchema } from 'src/utils/validators/errors/internal-server-error-schema';
import { UnauthorizedSchema } from 'src/utils/validators/errors/unauthorized-schema';
import { TokenResponseSchema } from 'src/utils/validators/token-schema';
import { signIn } from './sign-in.controller';
import { SignOutResponseSchema } from 'src/utils/validators/auth/sign-out-schema';
import { signOut } from './sign-out.controller';
import { refreshToken } from './refresh-token.controller';

export async function authRoutes(app: FastifyTypedInstance) {
    app.post('/sign-in',
        {
            schema: {
                description: 'Sign In',
                tags: ['Auth'],
                body: AuthenticateRequestBodyZod,
                response: {
                    200: TokenResponseSchema.describe('Authenticated'),
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        signIn
    );

    app.post('/sign-out',
        {
            schema: {
                description: 'Sign out',
                tags: ['Auth'],
                response: {
                    200: SignOutResponseSchema,
                    401: UnauthorizedSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        signOut
    );

    app.post('/refresh-token',
        {
            schema: {
                description: 'Refresh token',
                tags: ['Auth'],
                response: {
                    200: TokenResponseSchema.describe('Successfully refresh token'),
                    401: UnauthorizedSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        refreshToken
    );
}