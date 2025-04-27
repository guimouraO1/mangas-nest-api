import { MangasRepository } from 'src/repositories/mangas-repository';
import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface SubscribeMangaUseCaseRequest {
    userId: string;
    mangaId: string;
    rating: number;
}

interface SubscribeMangaUseCaseResponse {
    userId: string;
    mangaId: string;
    rating: number;
    id: string;
}

export class SubscribeMangaUseCase {
    constructor(
        private subscriptionsRepository: SubscriptionsRepository,
        private mangasRepository: MangasRepository
    ) {}

    async execute({ userId, mangaId, rating }: SubscribeMangaUseCaseRequest): Promise<SubscribeMangaUseCaseResponse> {
        const mangasExists = await this.mangasRepository.getMangaById({ mangaId });

        if (!mangasExists) {
            throw new ResourceNotFoundError();
        }

        const subscription = await this.subscriptionsRepository.subscribe({ userId, mangaId, rating });

        return subscription;
    }
}
