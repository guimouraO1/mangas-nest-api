import { PrismaMangasRepository } from 'src/repositories/prisma/prisma-mangas-repository';
import { GetAllMangasCountUseCase } from '../mangas/get-all-mangas-count';

export function makeGetAllMangasCountUseCase() {
    const mangasRepository = new PrismaMangasRepository();
    const getAllMangasCountUseCase = new GetAllMangasCountUseCase(mangasRepository);

    return getAllMangasCountUseCase;
}
