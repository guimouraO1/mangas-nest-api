import { MangasRepository } from "@/repositories/mangas-repository";

interface GetAllMangasCountUseCaseResponse {
    mangasCount: number;
}

export class GetAllMangasCountUseCase {
    constructor(private mangasRepository: MangasRepository) {}

    async execute(): Promise<GetAllMangasCountUseCaseResponse> {
        const mangasCount = await this.mangasRepository.getAllMangasCount();

        return { mangasCount };
    }
}
