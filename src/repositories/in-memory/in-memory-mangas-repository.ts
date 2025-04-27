import { CreateMangaType } from 'src/utils/validators/mangas/create-manga-schema';
import { Manga, MangasRepository } from '../mangas-repository';

export class InMemoryMangasRepository implements MangasRepository {
    public mangas: Manga[] = [];

    async getMangaById(id: string) {
        return this.mangas.find((manga) => manga.id === id) || null;
    }

    async getPaginatedMangas({ page, offset }: { page: number; offset: number }) {
        const mangas = this.mangas.slice((page - 1) * offset, page * offset);
        const mangasCount = this.mangas.length;

        return { mangas, mangasCount };
    }

    async create(data: CreateMangaType) {
        const manga = {
            id: crypto.randomUUID(),
            name: data.name,
            url: data.url,
            date: data.date,
            about: data.about || '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.mangas.push(manga);

        return manga;
    }
}
