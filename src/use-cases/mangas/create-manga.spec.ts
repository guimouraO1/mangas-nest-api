import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemoryMangasRepository } from "@/repositories/in-memory/in-memory-mangas-repository";
import { CreateMangaUseCase } from "./create-manga";
import { WeekDay } from "@prisma/client";

interface CreateMangaUseCaseRequest {
    name: string;
    url: string;
    date: WeekDay;
}

let mangasRepository: InMemoryMangasRepository;
let sut: CreateMangaUseCase;
let request: CreateMangaUseCaseRequest;

describe("Create Manga use case", () => {
    beforeEach(() => {
        mangasRepository = new InMemoryMangasRepository();
        sut = new CreateMangaUseCase(mangasRepository);

        request = {
            name: "Sousou no Frieren",
            url: "http://teste.com/frieren.png",
            date: "fri"
        };
    });

    it("should be able to create a new manga", async () => {
        const { manga } = await sut.execute(request);

        expect(manga.url).equal("http://teste.com/frieren.png");
        expect(manga.name).equal("Sousou no Frieren");
    });
});
