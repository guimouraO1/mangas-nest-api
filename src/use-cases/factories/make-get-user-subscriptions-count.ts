import { PrismaSubscriptionsRepository } from "@/repositories/prisma/prisma-subscriptions.repository";
import { GetUserSubscriptionsCountUseCase } from "../subscriptions/get-user-subscriptions-count";

export function makeGetUserSubscriptionsCountUseCase() {
    const subscriptionsRepository = new PrismaSubscriptionsRepository();
    const getUserSubscriptionsCountUseCase = new GetUserSubscriptionsCountUseCase(subscriptionsRepository);

    return getUserSubscriptionsCountUseCase;
}
