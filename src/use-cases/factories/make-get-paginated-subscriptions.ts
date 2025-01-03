import { GetPaginatedSubscriptionsUseCase } from "../subscriptions/get-paginated-subscriptions";
import { PrismaSubscriptionsRepository } from "@/repositories/prisma/prisma-subscriptions.repository";

export function makeGetPaginatedSubscriptionsUseCase() {
    const subscriptionsRepository = new PrismaSubscriptionsRepository();
    const getPaginatedSubscriptionsUseCase = new GetPaginatedSubscriptionsUseCase(subscriptionsRepository);

    return getPaginatedSubscriptionsUseCase;
}
