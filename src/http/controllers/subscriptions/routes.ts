import { getUserPaginatedSubscriptions } from './get-paginated-subscriptions.controller';
import { verifyJwt } from 'src/http/middlewares/verify-jwt';
import { FastifyTypedInstance } from 'src/@types/fastify-type';
import { BadRequestSchema } from 'src/utils/validators/errors/bad-request-schema';
import { ForbiddenSchema } from 'src/utils/validators/errors/forbidden-schema';
import { InternalServerErrorSchema } from 'src/utils/validators/errors/internal-server-error-schema';
import { UnauthorizedSchema } from 'src/utils/validators/errors/unauthorized-schema';
import { GetPaginatedSubscriptionsRequestZod, GetPaginatedSubscriptionsResponseZod } from 'src/utils/validators/subscriptions/get-subscriptions-schema';
import { CreatedSchema } from 'src/utils/validators/default-responses/created-schema';
import { subscribeManga } from './subscribe-manga.controller';
import { SubscribeRequestZod } from 'src/utils/validators/subscriptions/subscribe-schema';
import { ConflictSchema } from 'src/utils/validators/errors/conflict-schema';
import { authorizeOwnerOrAdminParams } from 'src/http/middlewares/authorize-owner-or-admin-params';
import { unsubscribeManga } from './unsubscribe-manga.controller';
import { UnsubscribeZod } from 'src/utils/validators/subscriptions/unsubscribe-schema';

export async function subscriptionsRoutes(app: FastifyTypedInstance) {
    app.get('/subscriptions',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Get Paginated Subscriptions',
                tags: ['subscriptions'],
                security: [ { BearerAuth: [] } ],
                querystring: GetPaginatedSubscriptionsRequestZod,
                response: {
                    200: GetPaginatedSubscriptionsResponseZod,
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    403: ForbiddenSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        getUserPaginatedSubscriptions
    );

    app.post('/subscriptions',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Subscribe manga',
                tags: ['subscriptions'],
                security: [ { BearerAuth: [] } ],
                body: SubscribeRequestZod,
                response: {
                    201: CreatedSchema.describe('Successfully subscribed to a manga'),
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    403: ForbiddenSchema,
                    409: ConflictSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        subscribeManga
    );

    app.delete('/subscriptions/:subscriptionId',
        {
            onRequest: [verifyJwt, authorizeOwnerOrAdminParams],
            schema: {
                description: 'Unsubscribe manga',
                tags: ['subscriptions'],
                security: [ { BearerAuth: [] } ],
                params: UnsubscribeZod,
                response: {
                    200: CreatedSchema.describe('Successfully unsubscribe a manga'),
                    400: BadRequestSchema,
                    401: UnauthorizedSchema,
                    403: ForbiddenSchema,
                    500: InternalServerErrorSchema
                }
            }
        },
        unsubscribeManga
    );
}
