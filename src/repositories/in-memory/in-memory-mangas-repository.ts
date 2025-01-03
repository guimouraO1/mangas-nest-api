import { Manga, Prisma } from "@prisma/client";
import { MangasRepository } from "../mangas-repository";

export class InMemoryMagasRepository implements MangasRepository {
    public mangas: Manga[] = [];

    async getAllMangasCount() {
        return this.mangas.length;
    }

    async getPaginatedMangas({ page, offset }: { page: number; offset: number }): Promise<Manga[]> {
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
