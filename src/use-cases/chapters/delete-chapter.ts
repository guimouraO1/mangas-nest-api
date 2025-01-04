import { Chapter } from "@prisma/client";
import { ChaptersRepository } from "@/repositories/chapters-repository";
import { SubscriptionsRepository } from "@/repositories/subscriptions-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { ForbiddenError } from "../errors/forbidden-error";

interface DeleteChapterUseCaseRequest {
    subscriptionId: string;
    number: number;
    userId: string;
}

interface DeleteChapterUseCaseResponse {
    chapter: Chapter;
}

export class DeleteChapterUseCase {
    constructor(
        private chaptersRepository: ChaptersRepository,
        private subscriptionsRepository: SubscriptionsRepository
    ) {}

    async execute({ subscriptionId, number, userId }: DeleteChapterUseCaseRequest): Promise<DeleteChapterUseCaseResponse> {
        const subscription = await this.subscriptionsRepository.getSubscriptionById({ subscriptionId });

        if (!subscription) {
            throw new ResourceNotFoundError();
        }

        if (subscription.userId !== userId) {
            throw new ForbiddenError();
        }

        const chapter = await this.chaptersRepository.delete({
            subscriptionId,
            number
        });

        return { chapter };
    }
}
