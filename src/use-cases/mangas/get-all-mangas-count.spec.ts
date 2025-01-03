import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemoryMagasRepository } from "@/repositories/in-memory/in-memory-mangas-repository";
import { GetAllMangasCountUseCase } from "./get-all-mangas-count";

let mangasRepository: InMemoryMagasRepository;
let sut: GetAllMangasCountUseCase;

describe("Get all Mangas count use case", () => {
    beforeEach(() => {
        mangasRepository = new InMemoryMagasRepository();
        sut = new GetAllMangasCountUseCase(mangasRepository);
    });

    it("should be able to get all manga count", async () => {
        await mangasRepository.create({
            name: "Sousou no Frieren",
            url: "http://teste.com/frieren.png",
            date: "fri"
        });
        await mangasRepository.create({
            name: "Another Manga",
            url: "http://teste.com/another.png",
            date: "sat"
        });
        await mangasRepository.create({
            name: "Different Manga",
            url: "http://teste.com/different.png",
            date: "mon"
        });

        const { mangasCount } = await sut.execute();

        expect(Number.isInteger(mangasCount)).toBe(true);
        expect(mangasCount).equal(3);
    });
});
