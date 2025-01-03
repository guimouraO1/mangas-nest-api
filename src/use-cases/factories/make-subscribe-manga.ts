import { PrismaSubscriptionsRepository } from "@/repositories/prisma/prisma-subscriptions.repository";
import { SubscribeMangaUseCase } from "../subscriptions/subscribe-manga";

export function makeSubscribeMangaUseCase() {
    const subscriptionsRepository = new PrismaSubscriptionsRepository();
    const subscribeMangaUseCase = new SubscribeMangaUseCase(subscriptionsRepository);

    return subscribeMangaUseCase;
}
