
import { z } from 'zod';
import { Pagination, PaginationRequestZod } from '../pagination-schema';

export const GetPaginatedSubscriptionsRequestZod = PaginationRequestZod.extend({
    // userId: z.string().max(1000)
}); //mudar esse mude o de baixo

export type GetPaginatedSubscriptionsRequest = z.infer<typeof GetPaginatedSubscriptionsRequestZod>;

export const GetPaginatedSubscriptionsZod = Pagination.extend({
    userId: z.string().max(1000)
}); // Esse

export type GetPaginatedSubscriptions = z.infer<typeof GetPaginatedSubscriptionsZod>;

export const GetPaginatedSubscriptionsResponseZod = z.object({
    subscriptions: z.array(
        z.object({
            id: z.string(),
            userId: z.string(),
            mangaId: z.string(),
            rating: z.number(),
            manga: z.object({
                id: z.string(),
                name: z.string(),
                date: z.string(),
                url: z.string(),
                about: z.string().nullable().optional(),
                createdAt: z.date(),
                updatedAt: z.date()
            }).optional().nullable(),
            chapters: z.array(
                z.object({
                    id: z.string(),
                    subscriptionId: z.string(),
                    number: z.number()
                })).optional().nullable()
        })),
    subscriptionsCount: z.number()
});

export type GetPaginatedSubscriptionsResponse = z.infer<typeof GetPaginatedSubscriptionsResponseZod>;