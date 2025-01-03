import { SubscriptionsRepository } from "@/repositories/subscriptions-repository";

interface UnsubscribeMangaUseCaseRequest {
    subscriptionId: string;
}

interface UnsubscribeMangaUseCaseResponse {
    userId: string;
    mangaId: string;
    rating: number;
    id: string;
}

export class UnsubscribeMangaUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ subscriptionId }: UnsubscribeMangaUseCaseRequest): Promise<UnsubscribeMangaUseCaseResponse> {
        const unsubscribe = await this.subscriptionsRepository.unsubscribe({ subscriptionId });

        return unsubscribe;
    }
}
