import { PrismaMangasRepository } from 'src/repositories/prisma/prisma-mangas-repository';
import { GetPaginatedMangasUseCase } from '../mangas/get-paginated-mangas';

export function makeGetPaginatedMangasUseCase() {
    const mangasRepository = new PrismaMangasRepository();
    const getPaginatedMangasUseCase = new GetPaginatedMangasUseCase(mangasRepository);

    return getPaginatedMangasUseCase;
}
