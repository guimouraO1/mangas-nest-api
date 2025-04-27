import { Manga } from '@prisma/client';

export const FAKE_MANGA: Manga = {
    id: 'manga_id',
    name: 'Manga name',
    about: 'About manga',
    date: 'fri',
    url: 'https://example.com/manga',
    createdAt: new Date(),
    updatedAt: new Date()
};