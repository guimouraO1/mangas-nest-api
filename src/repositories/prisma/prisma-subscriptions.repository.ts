import { prisma } from '../../lib/prisma';
import { Subscription, SubscriptionsRepository } from '../subscriptions-repository';
import { LAST_CHAPTERS_OFFSEET } from '../../utils/constants/default-offset-chapters';
import { GetPaginatedSubscriptions } from '../../utils/validators/subscriptions/get-subscriptions-schema';
import { Subscribe } from '../../utils/validators/subscriptions/subscribe-schema';

export class PrismaSubscriptionsRepository implements SubscriptionsRepository {
    async getSubscriptionById(subscriptionId: string) {
        const subscription = await prisma.subscription.findUnique({ where: { id: subscriptionId } });
        return subscription;
    }

    async unsubscribe(subscriptionId: string) {
        const unsubscribe = await prisma.subscription.delete({ where: { id: subscriptionId } });
        return unsubscribe;
    }

    async subscribe(data: Subscribe) {
        const subscription = await prisma.subscription.create({ data });
        return subscription;
    }

    async getSubscriptionByUserId(userId: string, mangaId: string) {
        const subscription = await prisma.subscription.findUnique({
            where: {
                userId_mangaId: {
                    userId,
                    mangaId
                }
            }
        });

        return subscription;
    }

    async getPaginatedSubscriptions({ page, offset, userId }: GetPaginatedSubscriptions) {
        const skip = (page - 1) * offset;

        const subscriptions = await prisma.subscription.findMany({
            where: { userId },
            include: {
                manga: true,
                chapters: {
                    take: LAST_CHAPTERS_OFFSEET,
                    orderBy: { number: 'desc' }
                }
            },
            skip,
            take: offset
        });

        const subscriptionsCount = await prisma.subscription.count({
            where: { userId }
        });

        return { subscriptions, subscriptionsCount };
    }
}
