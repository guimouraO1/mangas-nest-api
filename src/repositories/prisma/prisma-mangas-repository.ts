import { prisma } from "@/lib/prisma";
import { Manga, Prisma } from "@prisma/client";
import { MangasRepository } from "../mangas-repository";

export class PrismaMangasRepository implements MangasRepository {
    async create(data: Prisma.MangaCreateInput) {
        const manga = await prisma.manga.create({ data });

        return manga;
    }

    async getPaginatedMangas({ page, offset }: { page: number; offset: number }): Promise<Manga[]> {
        const skip = (page - 1) * offset;
        
        const mangas = await prisma.manga.findMany({
            // include: {
            //     subscriptions: {
            //         where: {
            //             userId
            //         }
            //     },
            // },
            skip,
            take: offset
        });

        return mangas;
    }
}
