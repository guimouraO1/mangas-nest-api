import { Chapter } from "@prisma/client";
import { ChaptersRepository } from "@/repositories/chapters-repository";
import { SubscriptionsRepository } from "@/repositories/subscriptions-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteChapterUseCaseRequest {
    subscriptionId: string;
    number: number;
}

interface DeleteChapterUseCaseResponse {
    chapter: Chapter;
}

export class DeleteChapterUseCase {
    constructor(
        private chaptersRepository: ChaptersRepository,
        private subscriptionsRepository: SubscriptionsRepository
    ) {}

    async execute({ subscriptionId, number }: DeleteChapterUseCaseRequest): Promise<DeleteChapterUseCaseResponse> {
        const subscription = await this.subscriptionsRepository.getSubscriptionById({ subscriptionId });

        if (!subscription) {
            throw new ResourceNotFoundError();
        }

        const chapter = await this.chaptersRepository.delete({
            subscriptionId,
            number
        });

        return { chapter };
    }
}
