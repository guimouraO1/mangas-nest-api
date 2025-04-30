import { prisma } from '../../lib/prisma';
import { MangasRepository } from '../mangas-repository';
import { CreateMangaType } from '../../utils/validators/mangas/create-manga-schema';
import { GetPaginatedMangas } from '../../utils/validators/mangas/get-manga-schema';

export class PrismaMangasRepository implements MangasRepository {
    async getMangaById(id: string) {
        const manga = await prisma.manga.findUnique({ where: { id } });
        return manga;
    }

    async create(data: CreateMangaType) {
        const manga = await prisma.manga.create({ data });
        return manga;
    }

    async getPaginatedMangas({ page, offset, userId }: GetPaginatedMangas) {
        const skip = (page - 1) * offset;

        const mangas = await prisma.manga.findMany({
            include: {
                subscriptions: {
                    where: {
                        userId
                    },
                    select: {
                        id: true
                    }
                }
            },
            skip,
            take: offset
        });

        const mangasWithSubs = mangas.map(manga => ({
            ...manga,
            subscribed: manga.subscriptions.length > 0
        }));

        const mangasCount = await prisma.manga.count();
        return { mangas: mangasWithSubs, mangasCount };
    }
}
