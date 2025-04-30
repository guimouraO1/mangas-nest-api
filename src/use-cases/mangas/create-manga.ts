import { MangasRepository } from '../../repositories/mangas-repository';
import { CreateMangaType } from '../../utils/validators/mangas/create-manga-schema';

export class CreateMangaUseCase {
    constructor(private mangasRepository: MangasRepository) {}

    async execute(data: CreateMangaType) {
        const manga = await this.mangasRepository.create(data);
        return manga;
    }
}
