import { z } from 'zod';

export const UnsubscribeZod = z.object({
    mangaId: z.string()
});

export type Unsubscribe = z.infer<typeof UnsubscribeZod>;
