import { GetPaginatedSubscriptions, GetPaginatedSubscriptionsResponse } from 'src/utils/validators/subscriptions/get-subscriptions-schema';
import { Subscribe } from 'src/utils/validators/subscriptions/subscribe-schema';

export type Subscription = {
    id: string;
    userId: string;
    mangaId: string;
    rating: number;
}

export interface SubscriptionsRepository {
    subscribe(data: Subscribe): Promise<Subscription>;
    unsubscribe(subscriptionId: string): Promise<Subscription | null>;
    getPaginatedSubscriptions(data: GetPaginatedSubscriptions): Promise<GetPaginatedSubscriptionsResponse>;
    getSubscriptionById(subscriptionId: string): Promise<Subscription | null>;
    getSubscriptionByUserId(userId: string, mangaId: string): Promise<Subscription | null>;
}
