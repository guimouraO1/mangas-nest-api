import { z } from 'zod';

export const CreateMangaZod = z.object({
    name: z.string().max(60),
    url: z.string().url(),
    about: z.string().optional(),
    date: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])
});

export type CreateMangaType = z.infer<typeof CreateMangaZod>;