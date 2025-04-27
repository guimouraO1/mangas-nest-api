import { PrismaMangasRepository } from 'src/repositories/prisma/prisma-mangas-repository';
import { CreateMangaUseCase } from '../mangas/create-manga';

export function makeCreateMangaUseCase() {
    const mangasRepository = new PrismaMangasRepository();
    const createMangaUseCase = new CreateMangaUseCase(mangasRepository);

    return createMangaUseCase;
}
