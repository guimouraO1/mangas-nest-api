import { createChapter } from './create-chapter.controller';
import { deleteChapter } from './delete-chapter.controller';
import { FastifyTypedInstance } from 'src/@types/fastify-type';
import { verifyJwt } from 'src/http/middlewares/verify-jwt';
import { CreateChapterRequestBodyZod } from 'src/utils/validators/chapters/create-chapter-schema';
import { CreatedSchema } from 'src/utils/validators/default-responses/created-schema';
import { BadRequestSchema } from 'src/utils/validators/errors/bad-request-schema';
import { ForbiddenSchema } from 'src/utils/validators/errors/forbidden-schema';
import { InternalServerErrorSchema } from 'src/utils/validators/errors/internal-server-error-schema';
import { NotFoundSchema } from 'src/utils/validators/errors/not-found-schema';
import { UnauthorizedSchema } from 'src/utils/validators/errors/unauthorized-schema';
import { authorizeOwnerOrAdminBody } from 'src/http/middlewares/authorize-owner-or-admin-body';
import { authorizeOwnerOrAdminParams } from 'src/http/middlewares/authorize-owner-or-admin-params';
import { DeleteChapterRequestBodyZod } from 'src/utils/validators/chapters/delete-chapter-schema';
import { ConflictSchema } from 'src/utils/validators/errors/conflict-schema';

export async function chapterRoutes(app: FastifyTypedInstance) {
    app.post('/chapter',
        {
            onRequest: [verifyJwt, authorizeOwnerOrAdminBody],
            schema: {
                description: 'Create chapter',
                tags: ['chapters'],
                security: [{ BearerAuth: [] }],
                body: CreateChapterRequestBodyZod,
                response: {
                    201: CreatedSchema.describe('Chapter created successfully'),
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    403: ForbiddenSchema,
                    404: NotFoundSchema,
                    409: ConflictSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        createChapter
    );

    app.delete('/chapter/:subscriptionId/:number',
        {
            onRequest: [verifyJwt, authorizeOwnerOrAdminParams],
            schema: {
                description: 'Delete chapter',
                tags: ['chapters'],
                security: [{ BearerAuth: [] }],
                params: DeleteChapterRequestBodyZod,
                response: {
                    200: CreatedSchema.describe('Chapter deleted successfully'),
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    403: ForbiddenSchema,
                    404: NotFoundSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        deleteChapter
    );
}
