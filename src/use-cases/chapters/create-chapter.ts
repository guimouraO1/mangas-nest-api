import { Chapter } from "@prisma/client";
import { ChaptersRepository } from "@/repositories/chapters-repository";
import { SubscriptionsRepository } from "@/repositories/subscriptions-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateChapterUseCaseRequest {
    subscriptionId: string;
    number: number;
}

interface CreateChapterUseCaseResponse {
    chapter: Chapter;
}

export class CreateChapterUseCase {
    constructor(
        private chaptersRepository: ChaptersRepository,
        private subscriptionsRepository: SubscriptionsRepository
    ) {}

    async execute({ subscriptionId, number }: CreateChapterUseCaseRequest): Promise<CreateChapterUseCaseResponse> {
        const subscription = await this.subscriptionsRepository.getSubscriptionById({ subscriptionId });

        if (!subscription) {
            throw new ResourceNotFoundError();
        }

        const chapter = await this.chaptersRepository.create({
            subscriptionId,
            number
        });

        return { chapter };
    }
}
