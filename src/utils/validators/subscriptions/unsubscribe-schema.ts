import { z } from 'zod';

export const UnsubscribeZod = z.object({
    subscriptionId: z.string()
});

export type Unsubscribe = z.infer<typeof UnsubscribeZod>;
