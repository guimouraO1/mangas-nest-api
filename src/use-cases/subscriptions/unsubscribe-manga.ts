import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { SubscriptionNotFoundError } from 'src/utils/errors/subscription-not-fount-error';

export class UnsubscribeMangaUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute(mangaId: string, userId: string) {
        const subscriptionExist = await this.subscriptionsRepository.getSubscriptionByUserId(userId, mangaId);
        if(!subscriptionExist) {
            throw new SubscriptionNotFoundError();
        }

        const unsubscribe = await this.subscriptionsRepository.unsubscribe(subscriptionExist.id);
        return unsubscribe;
    }
}
