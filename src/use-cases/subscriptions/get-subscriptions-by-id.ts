import { SubscriptionsRepository } from '../../repositories/subscriptions-repository';

export class GetSubscriptionByIdUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute(subscriptionId: string) {
        const subscription = await this.subscriptionsRepository.getSubscriptionById(subscriptionId);
        return subscription;
    }
}
