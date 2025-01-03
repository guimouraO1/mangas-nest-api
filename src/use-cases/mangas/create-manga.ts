import { Manga, WeekDay } from "@prisma/client";
import { MangasRepository } from "@/repositories/mangas-repository";

interface CreateMangaUseCaseRequest {
    name: string;
    url: string;
    date: WeekDay;
}

interface CreateMangaUseCaseResponse {
    manga: Manga;
}

export class CreateMangaUseCase {
    constructor(private mangasRepository: MangasRepository) {}

    async execute({ name, date, url }: CreateMangaUseCaseRequest): Promise<CreateMangaUseCaseResponse> {
        const manga = await this.mangasRepository.create({
            name,
            date,
            url
        });

        return { manga };
    }
}
