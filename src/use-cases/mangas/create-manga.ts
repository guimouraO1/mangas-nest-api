import { MangasRepository } from 'src/repositories/mangas-repository';
import { CreateMangaType } from 'src/utils/validators/mangas/create-manga-schema';

export class CreateMangaUseCase {
    constructor(private mangasRepository: MangasRepository) {}

    async execute(data: CreateMangaType) {
        const manga = await this.mangasRepository.create(data);
        return manga;
    }
}
