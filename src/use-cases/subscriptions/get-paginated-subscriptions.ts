import { Subscription } from "@prisma/client";
import { SubscriptionsRepository } from "@/repositories/subscriptions-repository";

interface GetPaginatedSubscriptionsUseCaseRequest {
    page: number;
    offset: number;
    userId: string;
}

interface GetPaginatedSubscriptionsUseCaseResponse {
    subscriptions: Subscription[];
}

export class GetPaginatedSubscriptionsUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ page, offset, userId }: GetPaginatedSubscriptionsUseCaseRequest): Promise<GetPaginatedSubscriptionsUseCaseResponse> {
        const subscriptions = await this.subscriptionsRepository.getPaginatedSubscriptions({
            page,
            offset,
            userId
        });

        return { subscriptions };
    }
}
