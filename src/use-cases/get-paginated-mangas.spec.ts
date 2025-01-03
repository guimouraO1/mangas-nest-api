import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { GetPaginatedMangasUseCase } from "./get-paginated-mangas";
import { InMemoryMagasRepository } from "@/repositories/in-memory/in-memory-mangas-repository";

interface GetPaginatedMangasUseCaseRequest {
    page: number;
    offset: number;
    userId: string;
}

let mangasRepository: InMemoryMagasRepository;
let sut: GetPaginatedMangasUseCase;
let request: GetPaginatedMangasUseCaseRequest;

describe("Get Paginated Mangas use case", () => {
    beforeEach(() => {
        mangasRepository = new InMemoryMagasRepository();
        sut = new GetPaginatedMangasUseCase(mangasRepository);

        request = {
            page: 1,
            offset: 4,
            userId: "user_id"
        };
    });

    it("should be able to get paginated manga list", async () => {
        await mangasRepository.create({
            name: "Sousou no Frieren",
            url: "http://teste.com/frieren.png",
            date: "fri"
        });

        const { mangas } = await sut.execute(request);

        expect(Array.isArray(mangas)).toBe(true);
        expect(mangas.length).equal(1);
        expect(mangas[0].name).equal("Sousou no Frieren");
    });
});
