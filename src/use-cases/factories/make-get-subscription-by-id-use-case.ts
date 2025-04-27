import { PrismaSubscriptionsRepository } from 'src/repositories/prisma/prisma-subscriptions.repository';
import { GetSubscriptionByIdUseCase } from '../subscriptions/get-subscriptions-by-id';

export function MakeGetSubscriptionByIdUseCase() {
    const subscriptionRepository = new PrismaSubscriptionsRepository();
    const getSubscriptionByIdUseCase = new GetSubscriptionByIdUseCase(subscriptionRepository);

    return getSubscriptionByIdUseCase;
}
