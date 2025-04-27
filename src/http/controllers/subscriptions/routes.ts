import { z } from 'zod';
import { getUserPaginatedSubscriptions } from './get-paginated-subscriptions.controller';
import { getUserSubscriptionsCount } from './get-user-subscriptions-count.controller';
import { subscribeManga } from './subscribe-manga.controller';
import { unsubscribeManga } from './unsubscribe-manga.controller';
import { verifyJwt } from 'src/http/middlewares/verify-jwt';
import { FastifyTypedInstance } from 'src/@types/fastify-type';

export async function subscriptionsRoutes(app: FastifyTypedInstance) {
    app.get(
        '/subscriptions',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Get Paginated Subscriptions',
                tags: ['subscriptions'],
                security: [
                    {
                        BearerAuth: []
                    }
                ],
                querystring: z.object({
                    page: z.string(),
                    offset: z.string()
                }),
                response: {
                    200: z
                        .object({
                            subscriptions: z.array(
                                z.object({
                                    id: z.string(),
                                    userId: z.string(),
                                    mangaId: z.string(),
                                    rating: z.number(),
                                    manga: z
                                        .object({
                                            id: z.string(),
                                            name: z.string(),
                                            date: z.string(),
                                            url: z.string(),
                                            about: z.string().nullable(),
                                            createdAt: z.date(),
                                            updatedAt: z.date()
                                        })
                                        .optional()
                                        .nullable(),
                                    chapters: z
                                        .array(
                                            z.object({
                                                id: z.string(),
                                                subscriptionId: z.string(),
                                                number: z.number()
                                            })
                                        )
                                        .optional()
                                        .nullable()
                                })
                            )
                        })
                        .describe('Successfully Get Paginated Subscriptions'),
                    400: z
                        .object({
                            message: z.string(),
                            issues: z.array(
                                z.object({
                                    errorCode: z.string(),
                                    field: z.string(),
                                    message: z.string()
                                })
                            )
                        })
                        .describe('Bad Request'),
                    401: z
                        .object({
                            message: z.string()
                        })
                        .describe('Unauthorized'),
                    403: z
                        .object({
                            message: z.string()
                        })
                        .describe('Forbidden'),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe('Internal Server Error')
                }
            }
        },
        getUserPaginatedSubscriptions
    );

    app.get(
        '/subscriptions/count',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Get User Subscriptions Count',
                tags: ['subscriptions'],
                security: [
                    {
                        BearerAuth: []
                    }
                ],
                response: {
                    200: z
                        .object({
                            subscriptionsCount: z.number()
                        })
                        .describe('Successfully Get User Subscriptions Count'),
                    401: z
                        .object({
                            message: z.string()
                        })
                        .describe('Unauthorized'),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe('Internal Server Error')
                }
            }
        },
        getUserSubscriptionsCount
    );

    app.post(
        '/subscriptions',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Subscribe manga',
                tags: ['subscriptions'],
                security: [
                    {
                        BearerAuth: []
                    }
                ],
                body: z.object({
                    mangaId: z.string(),
                    rating: z.number()
                }),
                response: {
                    200: z.object({}).describe('Successfully subscribed to a manga'),
                    400: z
                        .object({
                            message: z.string(),
                            issues: z.array(
                                z.object({
                                    errorCode: z.string(),
                                    field: z.string(),
                                    message: z.string()
                                })
                            )
                        })
                        .describe('Bad Request'),
                    401: z
                        .object({
                            message: z.string()
                        })
                        .describe('Unauthorized'),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe('Internal Server Error')
                }
            }
        },
        subscribeManga
    );

    app.delete(
        '/subscriptions/:subscriptionId',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Unsubscribe manga',
                tags: ['subscriptions'],
                security: [
                    {
                        BearerAuth: []
                    }
                ],
                params: z.object({
                    subscriptionId: z.string()
                }),
                response: {
                    200: z.object({}).describe('Successfully unsubscribe a manga'),
                    400: z
                        .object({
                            message: z.string(),
                            issues: z.array(
                                z.object({
                                    errorCode: z.string(),
                                    field: z.string(),
                                    message: z.string()
                                })
                            )
                        })
                        .describe('Bad Request'),
                    401: z
                        .object({
                            message: z.string()
                        })
                        .describe('Unauthorized'),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe('Internal Server Error')
                }
            }
        },
        unsubscribeManga
    );
}
