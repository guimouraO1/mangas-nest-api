import { PrismaChaptersRepository } from '../../repositories/prisma/prisma-chapters-repository';
import { PrismaSubscriptionsRepository } from '../../repositories/prisma/prisma-subscriptions.repository';
import { DeleteChapterUseCase } from '../chapters/delete-chapter';

export function makeDeleteChapterUseCase() {
    const chaptersRepository = new PrismaChaptersRepository();
    const subscriptionsRepository = new PrismaSubscriptionsRepository();
    const deleteChapterUseCase = new DeleteChapterUseCase(chaptersRepository, subscriptionsRepository);

    return deleteChapterUseCase;
}
