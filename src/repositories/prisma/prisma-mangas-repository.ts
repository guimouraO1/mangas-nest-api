import { prisma } from 'src/lib/prisma';
import { MangasRepository } from '../mangas-repository';
import { CreateMangaType } from 'src/utils/validators/mangas/create-manga-schema';
import { GetPaginatedMangas } from 'src/utils/validators/mangas/get-manga-schema';

export class PrismaMangasRepository implements MangasRepository {
    async getMangaById(id: string) {
        const manga = await prisma.manga.findUnique({ where: { id } });
        return manga;
    }

    async create(data: CreateMangaType) {
        const manga = await prisma.manga.create({ data });
        return manga;
    }

    async getPaginatedMangas({ page, offset }: GetPaginatedMangas) {
        const skip = (page - 1) * offset;

        const mangas = await prisma.manga.findMany({
            skip,
            take: offset
        });

        const mangasCount = await prisma.manga.count();
        return { mangas, mangasCount };
    }
}
