import { Chapter } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { ChaptersRepository } from 'src/repositories/chapters-repository';
import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';

interface CreateChapterUseCaseRequest {
    subscriptionId: string;
    number: number;
    userId: string;
}

interface CreateChapterUseCaseResponse {
    chapter: Chapter;
}

export class CreateChapterUseCase {
    constructor(
        private chaptersRepository: ChaptersRepository,
        private subscriptionsRepository: SubscriptionsRepository
    ) {}

    async execute({ subscriptionId, number, userId }: CreateChapterUseCaseRequest): Promise<CreateChapterUseCaseResponse> {
        const subscription = await this.subscriptionsRepository.getSubscriptionById({ subscriptionId });

        if (!subscription) {
            throw new ResourceNotFoundError();
        }

        if (subscription.userId !== userId) {
            throw new ForbiddenError();
        }

        const chapter = await this.chaptersRepository.create({
            subscriptionId,
            number
        });

        return { chapter };
    }
}
