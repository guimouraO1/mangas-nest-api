import { MangasRepository } from 'src/repositories/mangas-repository';
import { GetPaginatedMangas } from 'src/utils/validators/mangas/get-manga-schema';

export class GetPaginatedMangasUseCase {
    constructor(private mangasRepository: MangasRepository) {}

    async execute({ page, offset, userId }: GetPaginatedMangas) {
        const mangas = await this.mangasRepository.getPaginatedMangas({ page, offset, userId });
        return mangas;
    }
}
