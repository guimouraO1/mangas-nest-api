import { Manga, Prisma } from "@prisma/client";

export interface MangasRepository {
    create(data: Prisma.MangaCreateInput): Promise<Manga>;
    getPaginatedMangas({
        page,
        offset
    }: {
        page: number;
        offset: number;
    }): Promise<Manga[]>;
}
