import { beforeEach, describe, expect, it } from 'vitest';
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/in-memory-subscriptions-repository';
import { FAKE_MANGA } from '../../utils/constants/fake-manga';
import { FAKE_USER } from '../../utils/constants/fake-user';
import { GetSubscriptionByIdUseCase } from './get-subscriptions-by-id';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: GetSubscriptionByIdUseCase;

describe('Get Subscription by id use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        sut = new GetSubscriptionByIdUseCase(subscriptionsRepository);
    });

    it('should be able to get subscription by id', async () => {
        const subscription = await subscriptionsRepository.subscribe({
            mangaId: FAKE_MANGA.id,
            userId: FAKE_USER.id,
            rating: 4
        });

        const subscriptionCreated = await sut.execute(subscription.id);

        expect(subscription.mangaId).to.equal(subscriptionCreated?.mangaId);
        expect(subscription.userId).to.equal(subscriptionCreated?.userId);
        expect(subscription.id).to.equal(subscriptionCreated?.id);
        expect(subscription.rating).equal(4);
    });
});
