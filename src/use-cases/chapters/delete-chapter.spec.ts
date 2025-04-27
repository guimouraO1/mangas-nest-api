import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { DeleteChapterUseCase } from './delete-chapter';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { InMemoryChaptersRepository } from 'src/repositories/in-memory/in-memory-chapters-repository';
import { InMemoryMangasRepository } from 'src/repositories/in-memory/in-memory-mangas-repository';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';
// import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let subscriptionsRepository: InMemorySubscriptionsRepository;
let chapterRepository: InMemoryChaptersRepository;
let mangasRepository: InMemoryMangasRepository;
let sut: DeleteChapterUseCase;

describe('Delete Chapter use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        chapterRepository = new InMemoryChaptersRepository();
        mangasRepository = new InMemoryMangasRepository();
        sut = new DeleteChapterUseCase(chapterRepository, subscriptionsRepository);
    });

    it('should be able to delete a chapter', async () => {
        mangasRepository.mangas.push({
            id: 'manga_id',
            name: 'Sousou no Frieren',
            about: 'A test manga',
            date: 'fri',
            url: 'https://example.com/manga',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const subscription = await subscriptionsRepository.subscribe({
            mangaId: 'manga_id',
            userId: 'user_id',
            rating: 5
        });

        await chapterRepository.create({ subscriptionId: subscription.id, number: 1 });

        const chapterDeleted = await sut.execute({ subscriptionId: subscription.id, number: 1, userId: 'user_id' });

        expect(chapterDeleted.chapter.number).equal(1);
        expect(chapterDeleted.chapter.subscriptionId).equal(subscription.id);
    });

    it('should not be able to delete a chapter if you are not the owner of the subscription', async () => {
        mangasRepository.mangas.push({
            id: 'manga_id',
            name: 'Sousou no Frieren',
            about: 'A test manga',
            date: 'fri',
            url: 'https://example.com/manga',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const subscription = await subscriptionsRepository.subscribe({
            mangaId: 'manga_id',
            userId: 'user_id',
            rating: 5
        });

        await expect(sut.execute({ subscriptionId: subscription.id, number: 1, userId: 'user_is_not_the_owner' })).rejects.toThrow(ForbiddenError);
    });

    it('should not be able to delete a chapter when subscription does not exist', async () => {
        await expect(sut.execute({ subscriptionId: 'subscriptionId_dont_exists', number: 1, userId: 'user_id' })).rejects.toThrow(ResourceNotFoundError);
    });
});
