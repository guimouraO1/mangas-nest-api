import { createManga } from './create-manga.controller';
import { getPaginatedMangas } from './get-paginated-mangas';
import { FastifyTypedInstance } from '../../../@types/fastify-type';
import { authorizeAdminOnly } from '../../../http/middlewares/verify-admin-role';
import { verifyJwt } from '../../../http/middlewares/verify-jwt';
import { CreateMangaZod } from '../../../utils/validators/mangas/create-manga-schema';
import { CreatedSchema } from '../../../utils/validators/default-responses/created-schema';
import { BadRequestSchema } from '../../../utils/validators/errors/bad-request-schema';
import { UnauthorizedSchema } from '../../../utils/validators/errors/unauthorized-schema';
import { InternalServerErrorSchema } from '../../../utils/validators/errors/internal-server-error-schema';
import { GetPaginatedMangasRequestZod, GetPaginatedMangasResponseZod } from '../../../utils/validators/mangas/get-manga-schema';
import { ForbiddenSchema } from '../../../utils/validators/errors/forbidden-schema';

export async function mangaRoutes(app: FastifyTypedInstance) {
    app.post('/manga',
        {
            onRequest: [verifyJwt, authorizeAdminOnly],
            schema: {
                description: 'Create a new manga',
                tags: ['mangas'],
                security: [ { BearerAuth: [] } ],
                body: CreateMangaZod,
                response: {
                    201: CreatedSchema.describe('Manga created'),
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    403: ForbiddenSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        createManga
    );

    app.get('/manga',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Get Paginated Mangas',
                tags: ['mangas'],
                security: [ { BearerAuth: [] } ],
                querystring: GetPaginatedMangasRequestZod,
                response: {
                    200: GetPaginatedMangasResponseZod,
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    403: ForbiddenSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        getPaginatedMangas
    );
}
