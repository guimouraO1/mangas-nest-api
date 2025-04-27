import { z } from 'zod';

export const GetChapterRequestBodyZod = z.object({ subscriptionId: z.string().max(1000), number: z.number().max(10000) });

export type GetChapterRequestBody = z.infer<typeof GetChapterRequestBodyZod>;