import { beforeEach, describe, expect, it } from 'vitest';
import { UnsubscribeMangaUseCase } from './unsubscribe-manga';
import { ForbiddenError } from '../../utils/errors/forbidden-error';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';
import { FAKE_MANGA } from 'src/utils/constants/fake-manga';
import { FAKE_USER } from 'src/utils/constants/fake-user';
import { SubscriptionNotFoundError } from 'src/utils/errors/subscription-not-fount-error';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: UnsubscribeMangaUseCase;

describe('Unsubscribe manga use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        sut = new UnsubscribeMangaUseCase(subscriptionsRepository);
    });

    it('should be able to unsubscribe a manga', async () => {
        const subscription = await subscriptionsRepository.subscribe({
            mangaId: FAKE_MANGA.id,
            userId: FAKE_USER.id,
            rating: 5
        });

        const unsubscription = await sut.execute(FAKE_MANGA.id, FAKE_USER.id);
        expect(unsubscription?.id).equal(subscription.id);
        expect(unsubscription?.mangaId).equal(subscription.mangaId);
        expect(unsubscription?.userId).equal(subscription.userId);
    });

    it('should not be able to unsubscribing from a manga without a subscription', async () => {
        await expect(sut.execute(FAKE_MANGA.id, FAKE_USER.id)).rejects.toThrow(SubscriptionNotFoundError);
    });
});
