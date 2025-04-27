import { Manga, Prisma } from '@prisma/client';
import { MangasRepository } from '../mangas-repository';

export class InMemoryMangasRepository implements MangasRepository {
    public mangas: Manga[] = [];

    async getAllMangasCount() {
        return this.mangas.length;
    }

    async getMangaById({ mangaId }: { mangaId: string }) {
        return this.mangas.find((manga) => manga.id === mangaId) || null;
    }

    async getPaginatedMangas({ page, offset }: { page: number; offset: number }) {
        return this.mangas.slice((page - 1) * offset, page * offset);
    }

    async create(data: Prisma.MangaCreateInput) {
        const manga = {
            id: crypto.randomUUID(),
            name: data.name,
            url: data.url,
            date: data.date,
            about: data.about || null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.mangas.push(manga);

        return manga;
    }
}
