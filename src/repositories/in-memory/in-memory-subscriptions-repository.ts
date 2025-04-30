import { Subscription, SubscriptionsRepository } from '../subscriptions-repository';
import { Subscribe } from '../../utils/validators/subscriptions/subscribe-schema';
import { GetPaginatedSubscriptions } from '../../utils/validators/subscriptions/get-subscriptions-schema';

export class InMemorySubscriptionsRepository implements SubscriptionsRepository {
    public subscriptions: Subscription[] = [];

    async getSubscriptionByUserId(userId: string, mangaId: string): Promise<Subscription | null> {
        const subscription = this.subscriptions.find((subscription) => subscription.mangaId === mangaId && subscription.userId === userId);
        return subscription ?? null;
    }

    async getSubscriptionById(subscriptionId: string) {
        const subscription = this.subscriptions.find((subscription) => subscription.id === subscriptionId);
        return subscription ?? null;
    }

    async subscribe(data: Subscribe) {
        const subscription = {
            id: crypto.randomUUID(),
            mangaId: data.mangaId,
            userId: data.userId,
            rating: data.rating
        };

        this.subscriptions.push(subscription);
        return subscription;
    }

    async unsubscribe(subscriptionId: string) {
        const removedSubscription = this.subscriptions.find((subscription) => subscription.id === subscriptionId);
        this.subscriptions = this.subscriptions.filter((subscription) => subscription.id !== subscriptionId);

        return removedSubscription ?? null;
    }

    async getPaginatedSubscriptions({ page, offset, userId }: GetPaginatedSubscriptions) {
        const subscriptions = this.subscriptions.filter((subscription) => subscription.userId === userId).slice((page - 1) * offset, page * offset);
        const subscriptionsCount = this.subscriptions.length;

        return { subscriptions, subscriptionsCount };
    }
}
