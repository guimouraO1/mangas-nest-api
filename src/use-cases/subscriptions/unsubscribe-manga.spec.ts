import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemorySubscriptionsRepository } from "@/repositories/in-memory/in-memory-subscriptions-repository";
import { UnsubscribeMangaUseCase } from "./unsubscribe-manga";
import { ForbiddenError } from "../errors/forbidden-error";

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: UnsubscribeMangaUseCase;

describe("Subscribe manga use case", () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        sut = new UnsubscribeMangaUseCase(subscriptionsRepository);
    });

    it("should be able to unsubscribe a manga", async () => {
        const subscription = await subscriptionsRepository.subscribe({
            mangaId: "manga_id",
            userId: "user_id",
            rating: 5
        });

        const unsubscription = await sut.execute({ subscriptionId: subscription.id, userId: "user_id" });
        expect(unsubscription.id).equal(subscription.id);
        expect(unsubscription.mangaId).equal(subscription.mangaId);
        expect(unsubscription.userId).equal(subscription.userId);
    });

    it("should not be able to unsubscribe from a manga if you are not the owner of the subscription", async () => {
        const subscription = await subscriptionsRepository.subscribe({
            mangaId: "manga_id",
            userId: "user_id",
            rating: 5
        });

        await expect(sut.execute({ subscriptionId: subscription.id, userId: "user_is_not_the_owner" })).rejects.toThrow(ForbiddenError);
        const stillSubscribed = await subscriptionsRepository.getSubscriptionById({ subscriptionId: subscription.id });
        expect(stillSubscribed).not.toBeNull();
        expect(stillSubscribed?.userId).toBe(subscription.userId);
    });
});
