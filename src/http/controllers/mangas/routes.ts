import { z } from 'zod';
import { createManga } from './create-manga.controller';
import { getPaginatedMangas } from './get-paginated-mangas';
import { getAllMangasCount } from './get-all-mangas-count.controller';
import { FastifyTypedInstance } from 'src/@types/fastify-type';
import { authorizeAdminOnly } from 'src/http/middlewares/verify-admin-role';
import { verifyJwt } from 'src/http/middlewares/verify-jwt';

export async function mangaRoutes(app: FastifyTypedInstance) {
    app.post(
        '/manga',
        {
            onRequest: [verifyJwt, authorizeAdminOnly],
            schema: {
                description: 'Create a new manga',
                tags: ['mangas'],
                body: z.object({
                    name: z.string().max(60),
                    url: z.string().url(),
                    date: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])
                }),
                response: {
                    201: z.object({}).describe('Manga created'),
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
        createManga
    );

    app.get(
        '/manga',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Get Paginated Mangas',
                tags: ['mangas'],
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
                    200: z.object({
                        mangas: z
                            .array(
                                z.object({
                                    id: z.string(),
                                    name: z.string(),
                                    date: z.string(),
                                    url: z.string(),
                                    about: z.string().nullable(),
                                    createdAt: z.date(),
                                    updatedAt: z.date(),
                                    subscriptions: z.array(
                                        z.object({
                                            id: z.string()
                                        })
                                    )
                                })
                            )
                            .describe('Successfully Get Paginated Mangas')
                    }),
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
        getPaginatedMangas
    );

    app.get(
        '/manga/count',
        {
            onRequest: [verifyJwt],
            schema: {
                description: 'Get All Mangas Count',
                tags: ['mangas'],
                security: [
                    {
                        BearerAuth: []
                    }
                ],
                response: {
                    200: z.object({
                        mangasCount: z.number().describe('Successfully Get All Mangas Count')
                    }),
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
        getAllMangasCount
    );
}
