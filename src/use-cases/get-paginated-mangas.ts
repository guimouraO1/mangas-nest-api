import { Manga } from "@prisma/client";
import { MangasRepository } from "@/repositories/mangas-repository";

interface GetPaginatedMangasUseCaseRequest {
    page: number;
    offset: number;
}

interface GetPaginatedMangasUseCaseResponse {
    mangas: Manga[];
}

export class GetPaginatedMangasUseCase {
    constructor(private mangasRepository: MangasRepository) {}

    async execute({
        page,
        offset
    }: GetPaginatedMangasUseCaseRequest): Promise<GetPaginatedMangasUseCaseResponse> {
        const mangas = await this.mangasRepository.getPaginatedMangas({
            page,
            offset
        });

        return { mangas };
    }
}
