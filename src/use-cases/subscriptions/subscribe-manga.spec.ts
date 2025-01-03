import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemorySubscriptionsRepository } from "@/repositories/in-memory/in-memory-subscriptions-repository";
import { SubscribeMangaUseCase } from "./subscribe-manga";

interface SubscribeMangaUseCaseRequest {
    mangaId: string;
    userId: string;
    rating: number;
}

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: SubscribeMangaUseCase;
let request: SubscribeMangaUseCaseRequest;

describe("Subscribe manga use case", () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        sut = new SubscribeMangaUseCase(subscriptionsRepository);

        request = {
            mangaId: "manga_id",
            userId: "user_id",
            rating: 5
        };
    });

    it("should be able to subscribe to a manga", async () => {
        const subscription = await sut.execute(request);

        expect(subscription.userId).equal("user_id");
        expect(subscription.mangaId).equal("manga_id");
        expect(subscription.rating).equal(5);
    });
});
