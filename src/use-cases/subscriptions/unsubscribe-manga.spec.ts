import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemorySubscriptionsRepository } from "@/repositories/in-memory/in-memory-subscriptions-repository";
import { UnsubscribeMangaUseCase } from "./unsubscribe-manga";

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

        const unsubscription = await sut.execute({ subscriptionId: subscription.id });
        expect(unsubscription.id).equal(subscription.id);
        expect(unsubscription.mangaId).equal(subscription.mangaId);
        expect(unsubscription.userId).equal(subscription.userId);
    });
});
