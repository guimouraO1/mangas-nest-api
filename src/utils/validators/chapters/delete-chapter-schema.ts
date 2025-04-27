import { z } from 'zod';

export const DeleteChapterRequestBodyZod = z.object({ subscriptionId: z.string().max(1000), number: z.number().max(10000) });

export type DeleteChapterRequestBody = z.infer<typeof DeleteChapterRequestBodyZod>;