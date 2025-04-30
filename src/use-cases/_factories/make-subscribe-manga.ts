import { PrismaMangasRepository } from '../../repositories/prisma/prisma-mangas-repository';
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/prisma-subscriptions.repository';
import { SubscribeMangaUseCase } from '../subscriptions/subscribe-manga';

export function makeSubscribeMangaUseCase() {
    const subscriptionsRepository = new PrismaSubscriptionsRepository();
    const mangasRepository = new PrismaMangasRepository();
    const subscribeMangaUseCase = new SubscribeMangaUseCase(subscriptionsRepository, mangasRepository);

    return subscribeMangaUseCase;
}
