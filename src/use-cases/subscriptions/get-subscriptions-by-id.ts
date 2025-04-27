import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';

export class GetSubscriptionByIdUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ subscriptionId }: { subscriptionId: string }) {
        const subscription = await this.subscriptionsRepository.getSubscriptionById({ subscriptionId });
        return subscription;
    }
}
