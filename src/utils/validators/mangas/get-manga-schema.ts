
import { z } from 'zod';
import { Pagination, PaginationRequestZod } from '../pagination-schema';

export const GetPaginatedMangasRequestZod = PaginationRequestZod.extend({}); //mudar esse mude o de baixo

export type GetPaginatedMangasRequest = z.infer<typeof GetPaginatedMangasRequestZod>;

export const GetPaginatedMangasZod = Pagination.extend({
    userId: z.string()
}); // Esse

export type GetPaginatedMangas = z.infer<typeof GetPaginatedMangasZod>;

export const GetPaginatedMangasResponseZod = z.object({
    mangas: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                date: z.string(),
                url: z.string(),
                about: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
                subscribed: z.boolean()
            })),
    mangasCount: z.number()
});

export type GetPaginatedMangasResponse = z.infer<typeof GetPaginatedMangasResponseZod>;