import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteChapterUseCase } from './delete-chapter';
import { InMemoryChaptersRepository } from 'src/repositories/in-memory/in-memory-chapters-repository';
import { InMemoryMangasRepository } from 'src/repositories/in-memory/in-memory-mangas-repository';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';
import { Manga, User } from '@prisma/client';
import { FAKE_MANGA } from 'src/utils/constants/fake-manga';
import { FAKE_USER } from 'src/utils/constants/fake-user';
import { SubscriptionNotFoundError } from '../../utils/errors/subscription-not-fount-error';
import { ChapterNotFoundError } from '../../utils/errors/chapter-not-found-error';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let chapterRepository: InMemoryChaptersRepository;
let mangasRepository: InMemoryMangasRepository;
let sut: DeleteChapterUseCase;
let fakeManga: Manga;
let fakeUser: User;

describe('Delete Chapter use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        chapterRepository = new InMemoryChaptersRepository();
        mangasRepository = new InMemoryMangasRepository();
        sut = new DeleteChapterUseCase(chapterRepository, subscriptionsRepository);

        fakeManga = FAKE_MANGA;
        fakeUser = FAKE_USER;
    });

    it('should be able to delete a chapter', async () => {
        mangasRepository.mangas.push(fakeManga);

        const subscription = await subscriptionsRepository.subscribe({
            mangaId: fakeManga.id,
            userId: fakeUser.id,
            rating: 5
        });

        await chapterRepository.create({ subscriptionId: subscription.id, number: 1 });
        const chapterDeleted = await sut.execute({ subscriptionId: subscription.id, number: 1 });

        expect(chapterDeleted).not.toBeNull();
        expect(chapterDeleted?.number).equal(1);
        expect(chapterDeleted?.subscriptionId).equal(subscription.id);
    });

    it('should not be able to delete a chapter when subscriptionId does not exist', async () => {
        await expect(sut.execute({ subscriptionId: 'subscriptionId_dont_exists', number: 1 })).rejects.toThrow(SubscriptionNotFoundError);
    });

    it('should not be able to delete a chapter when chapter does not exist', async () => {
        mangasRepository.mangas.push(fakeManga);
        const subscription = await subscriptionsRepository.subscribe({
            mangaId: fakeManga.id,
            userId: fakeUser.id,
            rating: 5
        });
        await chapterRepository.create({ subscriptionId: subscription.id, number: 1 });
        await expect(sut.execute({ subscriptionId: subscription.id, number: 2 })).rejects.toThrow(ChapterNotFoundError);
    });
});
