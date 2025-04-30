import { beforeEach, describe, expect, it } from 'vitest';
import { GetPaginatedMangasUseCase } from './get-paginated-mangas';
import { InMemoryMangasRepository } from '../../repositories/in-memory/in-memory-mangas-repository';
import { FAKE_MANGA } from '../../utils/constants/fake-manga';
import { FAKE_USER } from '../../utils/constants/fake-user';

let mangasRepository: InMemoryMangasRepository;
let sut: GetPaginatedMangasUseCase;

describe('Get Paginated Mangas use case', () => {
    beforeEach(() => {
        mangasRepository = new InMemoryMangasRepository();
        sut = new GetPaginatedMangasUseCase(mangasRepository);
    });

    it('should be able to get paginated mangas', async () => {
        await mangasRepository.create({
            name: FAKE_MANGA.name,
            url: FAKE_MANGA.url,
            date: FAKE_MANGA.date
        });

        await mangasRepository.create({
            name: FAKE_MANGA.name.replace('Manga name', 'Manga name 2'),
            url: FAKE_MANGA.url.replace('manga', 'manga2'),
            date: 'mon'
        });

        const { mangas, mangasCount } = await sut.execute({
            page: 1,
            offset: 1,
            userId: FAKE_USER.id
        });

        expect(Array.isArray(mangas)).toBe(true);
        expect(mangas.length).equal(1);
        expect(mangas[0].name).equal(FAKE_MANGA.name);
        expect(mangasCount).equal(2);
    });
});
