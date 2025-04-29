import { CreateMangaType } from 'src/utils/validators/mangas/create-manga-schema';
import { Manga, MangasRepository } from '../mangas-repository';
import { Subscription } from '../subscriptions-repository';

export interface MangasWithSubs extends Manga {
    subscriptions?: Subscription[]
}

export class InMemoryMangasRepository implements MangasRepository {
    public mangas: MangasWithSubs[] = [];

    async getMangaById(id: string) {
        return this.mangas.find((manga) => manga.id === id) || null;
    }

    async getPaginatedMangas({ page, offset, userId }: { page: number; offset: number; userId: string }) {
        const mangas = this.mangas.slice((page - 1) * offset, page * offset);
        const mangasCount = this.mangas.length;

        const mangasWithSubs = mangas.map(manga => ({
            ...manga,
            subscribed: manga.subscriptions?.some(sub => sub.userId === userId) ?? false
        }));

        return { mangas: mangasWithSubs, mangasCount };
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
