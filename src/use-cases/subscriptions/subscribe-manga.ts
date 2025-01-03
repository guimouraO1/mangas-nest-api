import { SubscriptionsRepository } from "@/repositories/subscriptions-repository";

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
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ userId, mangaId, rating }: SubscribeMangaUseCaseRequest): Promise<SubscribeMangaUseCaseResponse> {
        const subscription = await this.subscriptionsRepository.subscribe({ userId, mangaId, rating });

        return subscription;
    }
}
