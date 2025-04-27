import { z } from 'zod';

export const CreateChapterRequestBodyZod = z.object({ subscriptionId: z.string().max(1000), number: z.number().max(10000) });

export type CreateChapterRequestBody = z.infer<typeof CreateChapterRequestBodyZod>;