import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { SubscriptionNotFoundError } from 'src/utils/errors/subscription-not-fount-error';

export class UnsubscribeMangaUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute(subscriptionId: string) {
        const subscriptionExist = await this.subscriptionsRepository.getSubscriptionById(subscriptionId);
        if(!subscriptionExist) {
            throw new SubscriptionNotFoundError();
        }

        const unsubscribe = await this.subscriptionsRepository.unsubscribe(subscriptionId);
        return unsubscribe;
    }
}
