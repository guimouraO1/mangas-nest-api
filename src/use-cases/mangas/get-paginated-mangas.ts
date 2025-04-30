import { MangasRepository } from '../../repositories/mangas-repository';
import { GetPaginatedMangas } from '../../utils/validators/mangas/get-manga-schema';

export class GetPaginatedMangasUseCase {
    constructor(private mangasRepository: MangasRepository) {}

    async execute({ page, offset, userId }: GetPaginatedMangas) {
        const mangas = await this.mangasRepository.getPaginatedMangas({ page, offset, userId });
        return mangas;
    }
}
