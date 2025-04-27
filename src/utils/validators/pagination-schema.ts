import { z } from 'zod';

export const PaginationRequestZod = z.object({
    page: z.string(),
    offset: z.enum(['4', '8'])
});

export type PaginationRequest = z.infer<typeof PaginationRequestZod>;

export const Pagination = z.object({
    page: z.number(),
    offset: z.number()
});

export type Pagination = z.infer<typeof Pagination>;