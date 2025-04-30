import { PrismaSubscriptionsRepository } from '../../repositories/prisma/prisma-subscriptions.repository';
import { UnsubscribeMangaUseCase } from '../subscriptions/unsubscribe-manga';

export function makeUnsubscribeMangaUseCase() {
    const subscriptionsRepository = new PrismaSubscriptionsRepository();
    const unsubscribeMangaUseCase = new UnsubscribeMangaUseCase(subscriptionsRepository);

    return unsubscribeMangaUseCase;
}
