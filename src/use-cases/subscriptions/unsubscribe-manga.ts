import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { ForbiddenError } from '../errors/forbidden-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UnsubscribeMangaUseCaseRequest {
    subscriptionId: string;
    userId: string;
}

interface UnsubscribeMangaUseCaseResponse {
    userId: string;
    mangaId: string;
    rating: number;
    id: string;
}

export class UnsubscribeMangaUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ subscriptionId, userId }: UnsubscribeMangaUseCaseRequest): Promise<UnsubscribeMangaUseCaseResponse> {
        const isUserAccessToThisSubscribe = await this.subscriptionsRepository.getSubscriptionById({ subscriptionId });

        if (!isUserAccessToThisSubscribe) {
            throw new ResourceNotFoundError();
        }

        if (isUserAccessToThisSubscribe.userId !== userId) {
            throw new ForbiddenError();
        }

        const unsubscribe = await this.subscriptionsRepository.unsubscribe({ subscriptionId });

        return unsubscribe;
    }
}
