import { beforeEach, describe, expect, it } from 'vitest';
import { CreateChapterUseCase } from './create-chapter';
import { InMemoryChaptersRepository } from 'src/repositories/in-memory/in-memory-chapters-repository';
import { InMemoryMangasRepository } from 'src/repositories/in-memory/in-memory-mangas-repository';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';
import { FAKE_MANGA } from 'src/utils/constants/fake-manga';
import { Manga, User } from '@prisma/client';
import { FAKE_USER } from 'src/utils/constants/fake-user';
import { SubscriptionNotFoundError } from '../errors/subscription-not-fount-error';
import { ChapterAlreadyExistsError } from '../errors/chapter-already-exists-error';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let chapterRepository: InMemoryChaptersRepository;
let mangasRepository: InMemoryMangasRepository;
let sut: CreateChapterUseCase;
let fakeManga: Manga;
let fakeUser: User;

describe('Create chapters use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        chapterRepository = new InMemoryChaptersRepository();
        mangasRepository = new InMemoryMangasRepository();
        sut = new CreateChapterUseCase(chapterRepository, subscriptionsRepository);

        fakeManga = FAKE_MANGA;
        fakeUser = FAKE_USER;
    });

    it('should be able to create a chapter', async () => {
        mangasRepository.mangas.push(fakeManga);

        const subscription = await subscriptionsRepository.subscribe({
            mangaId: fakeManga.id,
            userId: fakeUser.id,
            rating: 5
        });

        const chapter = await sut.execute({ subscriptionId: subscription.id, number: 1 });

        expect(chapter.number).equal(1);
        expect(chapter.subscriptionId).equal(subscription.id);
    });

    it('should not be able to create a chapter when subscriptionId does not exist', async () => {
        await expect(sut.execute({ subscriptionId: 'subscriptionId_dont_exists', number: 1 })).rejects.toThrow(SubscriptionNotFoundError);
    });

    it('should not be able to create a chapter when chapter already exists', async () => {
        mangasRepository.mangas.push(fakeManga);
        const subscription = await subscriptionsRepository.subscribe({
            mangaId: fakeManga.id,
            userId: fakeUser.id,
            rating: 5
        });

        await sut.execute({ subscriptionId: subscription.id, number: 1 });
        await expect(sut.execute({ subscriptionId: subscription.id, number: 1 })).rejects.toThrow(ChapterAlreadyExistsError);
    });
});
