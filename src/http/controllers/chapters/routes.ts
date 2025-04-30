import { createChapter } from './create-chapter.controller';
import { deleteChapter } from './delete-chapter.controller';
import { FastifyTypedInstance } from '../../../@types/fastify-type';
import { verifyJwt } from '../../../http/middlewares/verify-jwt';
import { CreateChapterRequestBodyZod } from '../../../utils/validators/chapters/create-chapter-schema';
import { CreatedSchema } from '../../../utils/validators/default-responses/created-schema';
import { BadRequestSchema } from '../../../utils/validators/errors/bad-request-schema';
import { ForbiddenSchema } from '../../../utils/validators/errors/forbidden-schema';
import { InternalServerErrorSchema } from '../../../utils/validators/errors/internal-server-error-schema';
import { NotFoundSchema } from '../../../utils/validators/errors/not-found-schema';
import { UnauthorizedSchema } from '../../../utils/validators/errors/unauthorized-schema';
import { authorizeOwnerOrAdminBody } from '../../../http/middlewares/authorize-owner-or-admin-body';
import { authorizeOwnerOrAdminParams } from '../../../http/middlewares/authorize-owner-or-admin-params';
import { DeleteChapterRequestBodyZodNumber } from '../../../utils/validators/chapters/delete-chapter-schema';
import { ConflictSchema } from '../../../utils/validators/errors/conflict-schema';

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
                params: DeleteChapterRequestBodyZodNumber,
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
