import { Manga, Prisma } from "@prisma/client";

export interface MangasRepository {
    create(data: Prisma.MangaCreateInput): Promise<Manga>;
    getPaginatedMangas({ page, offset, userId }: { page: number; offset: number; userId: string }): Promise<Manga[]>;
    getAllMangasCount(): Promise<number>;
}
