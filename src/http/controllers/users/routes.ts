import { register } from './register.controller';
import { FastifyTypedInstance } from 'src/@types/fastify-type';
import { CreateUserRequestSchema } from 'src/utils/validators/user/create-user-schema';
import { CreatedSchema } from 'src/utils/validators/default-responses/created-schema';
import { BadRequestSchema } from 'src/utils/validators/errors/bad-request-schema';
import { ConflictSchema } from 'src/utils/validators/errors/conflict-schema';
import { InternalServerErrorSchema } from 'src/utils/validators/errors/internal-server-error-schema';

export async function userRoutes(app: FastifyTypedInstance) {
    app.post('/user',
        {
            schema: {
                description: 'Create a new user',
                tags: ['users'],
                body: CreateUserRequestSchema,
                response: {
                    201: CreatedSchema.describe('User created'),
                    400: BadRequestSchema,
                    409: ConflictSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        register
    );
}
