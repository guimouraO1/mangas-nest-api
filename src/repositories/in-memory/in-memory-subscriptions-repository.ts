import { Subscription } from '@prisma/client';
import { SubscriptionsRepository } from '../subscriptions-repository';

export class InMemorySubscriptionsRepository implements SubscriptionsRepository {
    public subscriptions: Subscription[] = [];

    async getSubscriptionById({ subscriptionId }: { subscriptionId: string }) {
        const subscription = this.subscriptions.find((subscription) => subscription.id === subscriptionId);
        return subscription || null;
    }

    async subscribe(data: { userId: string; mangaId: string; rating: number }) {
        const subscription = {
            id: crypto.randomUUID(),
            mangaId: data.mangaId,
            userId: data.userId,
            rating: data.rating
        };

        this.subscriptions.push(subscription);

        return subscription;
    }

    async unsubscribe({ subscriptionId }: { subscriptionId: string }) {
        const removedSubscription = this.subscriptions.find((subscription) => subscription.id === subscriptionId);

        if (!removedSubscription) {
            throw new Error(`Subscription with id ${subscriptionId} not found`);
        }

        this.subscriptions = this.subscriptions.filter((subscription) => subscription.id !== subscriptionId);

        return removedSubscription;
    }

    async getPaginatedSubscriptions({ page, offset }: { page: number; offset: number }) {
        return this.subscriptions.slice((page - 1) * offset, page * offset);
    }

    async getUserSubscriptionsCount({ userId }: { userId: string }) {
        const subscriptionsCount = this.subscriptions.filter((subscription) => subscription.userId === userId);

        return subscriptionsCount.length;
    }
}
