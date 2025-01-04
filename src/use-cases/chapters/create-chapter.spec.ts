import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemorySubscriptionsRepository } from "@/repositories/in-memory/in-memory-subscriptions-repository";
import { InMemoryChaptersRepository } from "@/repositories/in-memory/in-memory-chapters-repository";
import { CreateChapterUseCase } from "./create-chapter";
import { InMemoryMangasRepository } from "@/repositories/in-memory/in-memory-mangas-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let subscriptionsRepository: InMemorySubscriptionsRepository;
let chapterRepository: InMemoryChaptersRepository;
let mangasRepository: InMemoryMangasRepository;
let sut: CreateChapterUseCase;

describe("Create Chapter use case", () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        chapterRepository = new InMemoryChaptersRepository();
        mangasRepository = new InMemoryMangasRepository();
        sut = new CreateChapterUseCase(chapterRepository, subscriptionsRepository);
    });

    it("should be able to create a chapter", async () => {
        mangasRepository.mangas.push({
            id: "manga_id",
            name: "Sousou no Frieren",
            about: "A test manga",
            date: "fri",
            url: "https://example.com/manga",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const subscription = await subscriptionsRepository.subscribe({
            mangaId: "manga_id",
            userId: "user_id",
            rating: 5
        });

        const { chapter } = await sut.execute({ subscriptionId: subscription.id, number: 1 });

        expect(chapter.number).equal(1);
        expect(chapter.subscriptionId).equal(subscription.id);
    });

    it("should not be able to create a chapter when subscriptionId does not exist", async () => {
        await expect(sut.execute({ subscriptionId: "subscriptionId_dont_exists", number: 1 })).rejects.toThrow(ResourceNotFoundError);
    });
});
