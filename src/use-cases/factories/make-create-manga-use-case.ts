import { PrismaMangasRepository } from "@/repositories/prisma/prisma-mangas-repository";
import { CreateMangaUseCase } from "../create-manga";

export function makeCreateMangaUseCase() {
    const mangasRepository = new PrismaMangasRepository();
    const createMangaUseCase = new CreateMangaUseCase(mangasRepository);

    return createMangaUseCase;
}
