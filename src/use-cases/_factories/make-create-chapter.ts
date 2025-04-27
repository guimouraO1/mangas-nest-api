import { PrismaChaptersRepository } from 'src/repositories/prisma/prisma-chapters-repository';
import { CreateChapterUseCase } from '../chapters/create-chapter';
import { PrismaSubscriptionsRepository } from 'src/repositories/prisma/prisma-subscriptions.repository';

export function makeCreateChapterUseCase() {
    const chaptersRepository = new PrismaChaptersRepository();
    const subscriptionsRepository = new PrismaSubscriptionsRepository();
    const createChapterUseCase = new CreateChapterUseCase(chaptersRepository, subscriptionsRepository);

    return createChapterUseCase;
}
