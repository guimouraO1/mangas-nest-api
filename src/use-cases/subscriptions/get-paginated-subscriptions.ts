import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { GetPaginatedSubscriptions } from 'src/utils/validators/subscriptions/get-subscriptions-schema';

export class GetPaginatedSubscriptionsUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ page, offset, userId }: GetPaginatedSubscriptions) {
        const subscriptions = await this.subscriptionsRepository.getPaginatedSubscriptions({ page, offset, userId });
        return subscriptions;
    }
}
