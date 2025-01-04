import { prisma } from "@/lib/prisma";
import { Subscription } from "@prisma/client";
import { SubscriptionsRepository } from "../subscriptions-repository";
import { LAST_CHAPTERS_OFFSEET } from "@/utils/default-offset-chapters";

export class PrismaSubscriptionsRepository implements SubscriptionsRepository {
    
    async getSubscriptionById({ subscriptionId }: { subscriptionId: string; }) {
        const subscription = await prisma.subscription.findUnique({ where: {id: subscriptionId} });

        return subscription;
    }

    async unsubscribe({ subscriptionId }: { subscriptionId: string; }) {
        const unsubscribe = await prisma.subscription.delete({ where: {id: subscriptionId} });

        return unsubscribe;
    }

    async getUserSubscriptionsCount({ userId }: { userId: string }) {
        const subscriptionsCount = await prisma.subscription.count({
            where: {
                userId
            }
        });

        return subscriptionsCount;
    }

    async subscribe(data: { userId: string, mangaId: string, rating: number }) {
        const subscription = await prisma.subscription.create({ data });

        return subscription;
    }

    async getPaginatedSubscriptions({ page, offset, userId }: { page: number; offset: number; userId: string; }) {
        const skip = (page - 1) * offset;
        
        const subscriptions = await prisma.subscription.findMany({
            where: {
                userId
            },
            include: {
                manga: true,
                chapters: {
                    take: LAST_CHAPTERS_OFFSEET,
                    orderBy: {
                        number: 'desc'
                    }
                }
            },
            skip,
            take: offset
        });

        return subscriptions;
    }
}
