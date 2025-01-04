import { prisma } from "@/lib/prisma";
import { Manga, Prisma } from "@prisma/client";
import { MangasRepository } from "../mangas-repository";

export class PrismaMangasRepository implements MangasRepository {
    async getMangaById({ mangaId }: { mangaId: string; }) {
        const manga = await prisma.manga.findUnique({
            where: { id: mangaId }
        })

        return manga;
    }

    async getAllMangasCount() {
        const mangasCount = await prisma.manga.count();

        return mangasCount;
    }

    async create(data: Prisma.MangaCreateInput) {
        const manga = await prisma.manga.create({ data });

        return manga;
    }

    async getPaginatedMangas({ page, offset, userId }: { page: number; offset: number; userId: string; }) {
        const skip = (page - 1) * offset;
        
        const mangas = await prisma.manga.findMany({
            include: {
                subscriptions: {
                    where: {
                        userId
                    }
                },
            },
            skip,
            take: offset
        });

        return mangas;
    }
}
