import { beforeEach, describe, expect, it } from 'vitest';
import { CreateMangaUseCase } from './create-manga';
import { InMemoryMangasRepository } from 'src/repositories/in-memory/in-memory-mangas-repository';
import { FAKE_MANGA } from 'src/utils/constants/fake-manga';

let mangasRepository: InMemoryMangasRepository;
let sut: CreateMangaUseCase;

describe('Create Manga use case', () => {
    beforeEach(() => {
        mangasRepository = new InMemoryMangasRepository();
        sut = new CreateMangaUseCase(mangasRepository);
    });

    it('should be able to create a new manga', async () => {
        const manga = await sut.execute({
            name: FAKE_MANGA.name,
            url: FAKE_MANGA.url,
            date: FAKE_MANGA.date
        });

        expect(manga.url).equal(FAKE_MANGA.url);
        expect(manga.name).equal(FAKE_MANGA.name);
        expect(manga.date).equal(FAKE_MANGA.date);
    });
});
