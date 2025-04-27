import { z } from 'zod';

export const SubscribeRequestZod = z.object({
    mangaId: z.string().max(1000),
    rating: z.number().min(1).max(5)
});

export type SubscribeRequestType = z.infer<typeof SubscribeRequestZod>;

export const SubscribeZod = SubscribeRequestZod.extend({
    userId: z.string()
});

export type Subscribe = z.infer<typeof SubscribeZod>;
