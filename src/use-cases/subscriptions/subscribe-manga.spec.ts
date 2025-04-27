import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { SubscribeMangaUseCase } from './subscribe-manga';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryMangasRepository } from 'src/repositories/in-memory/in-memory-mangas-repository';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let mangasRepository: InMemoryMangasRepository;
let sut: SubscribeMangaUseCase;

describe('Subscribe manga use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        mangasRepository = new InMemoryMangasRepository();
        sut = new SubscribeMangaUseCase(subscriptionsRepository, mangasRepository);
    });

    it('should be able to subscribe to a manga', async () => {
        mangasRepository.mangas.push({
            id: 'manga_id',
            name: 'Sousou no Frieren',
            about: 'A test manga',
            date: 'fri',
            url: 'https://example.com/manga',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const subscription = await sut.execute({
            mangaId: 'manga_id',
            userId: 'user_id',
            rating: 5
        });

        expect(subscription.userId).equal('user_id');
        expect(subscription.mangaId).equal('manga_id');
        expect(subscription.rating).equal(5);
    });

    it('should not be able to subscribe to a manga when manga does not exist', async () => {
        await expect(
            sut.execute({
                mangaId: 'manga_id_does_not_exist',
                userId: 'user_id',
                rating: 5
            })
        ).rejects.toThrow(ResourceNotFoundError);
    });
});
