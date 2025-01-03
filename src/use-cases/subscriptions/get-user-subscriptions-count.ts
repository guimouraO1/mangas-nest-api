import { SubscriptionsRepository } from "@/repositories/subscriptions-repository";

interface GetUserSubscriptionsCountUseCaseRequest {
    userId: string;
}

interface GetUserSubscriptionsCountUseCaseResponse {
    subscriptionsCount: number;
}

export class GetUserSubscriptionsCountUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ userId }: GetUserSubscriptionsCountUseCaseRequest): Promise<GetUserSubscriptionsCountUseCaseResponse> {
        const subscriptionsCount = await this.subscriptionsRepository.getUserSubscriptionsCount({ userId });

        return { subscriptionsCount };
    }
}
