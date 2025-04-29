import { beforeEach, describe, expect, it } from 'vitest';
import { SubscribeMangaUseCase } from './subscribe-manga';
import { ResourceNotFoundError } from '../../utils/errors/resource-not-found-error';
import { InMemoryMangasRepository } from 'src/repositories/in-memory/in-memory-mangas-repository';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';
import { FAKE_MANGA } from 'src/utils/constants/fake-manga';
import { FAKE_USER } from 'src/utils/constants/fake-user';
import { MangaNotFoundError } from 'src/utils/errors/manga-not-found-error';
import { AlreadySubscribedError } from 'src/utils/errors/already-subscribed-error';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let mangasRepository: InMemoryMangasRepository;
let sut: SubscribeMangaUseCase;

describe('Subscribe manga use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        mangasRepository = new InMemoryMangasRepository();
        sut = new SubscribeMangaUseCase(subscriptionsRepository, mangasRepository);
    });

    it('should be able to subscribe a manga', async () => {
        mangasRepository.mangas.push({
            id: FAKE_MANGA.id,
            name: FAKE_MANGA.name,
            about: FAKE_MANGA.about,
            date: FAKE_MANGA.date,
            url: FAKE_MANGA.url,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const subscription = await sut.execute({
            mangaId: FAKE_MANGA.id,
            userId: FAKE_USER.id,
            rating: 2
        });

        expect(subscription.userId).equal(FAKE_USER.id);
        expect(subscription.mangaId).equal(FAKE_MANGA.id);
        expect(subscription.rating).equal(2);
    });

    it('should not be able to subscribe a manga when manga does not exist', async () => {
        await expect(sut.execute({
            mangaId: 'manga_id_does_not_exist',
            userId: FAKE_USER.id,
            rating: 1
        })
        ).rejects.toThrow(MangaNotFoundError);
    });

    it('should not be able to subscribe to a manga that is already subscribed', async () => {
        mangasRepository.mangas.push({
            id: FAKE_MANGA.id,
            name: FAKE_MANGA.name,
            about: FAKE_MANGA.about,
            date: FAKE_MANGA.date,
            url: FAKE_MANGA.url,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await sut.execute({
            mangaId: FAKE_MANGA.id,
            userId: FAKE_USER.id,
            rating: 1
        });

        await expect(sut.execute({
            mangaId: FAKE_MANGA.id,
            userId: FAKE_USER.id,
            rating: 4
        })).rejects.toThrow(AlreadySubscribedError);
    });
});
