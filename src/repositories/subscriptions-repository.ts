import { Subscription } from '@prisma/client';

export interface SubscriptionsRepository {
    subscribe(data: { userId: string; mangaId: string; rating: number }): Promise<Subscription>;
    unsubscribe({ subscriptionId }: { subscriptionId: string }): Promise<Subscription>;
    getPaginatedSubscriptions({ page, offset, userId }: { page: number; offset: number; userId: string }): Promise<Subscription[]>;
    getUserSubscriptionsCount({ userId }: { userId: string }): Promise<number>;
    getSubscriptionById(subscriptionId: string): Promise<Subscription | null>;
}
