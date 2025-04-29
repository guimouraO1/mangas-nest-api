import { beforeEach, describe, expect, it } from 'vitest';
import { GetPaginatedSubscriptionsUseCase } from './get-paginated-subscriptions';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';
import { FAKE_USER } from 'src/utils/constants/fake-user';
import { FAKE_MANGA } from 'src/utils/constants/fake-manga';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: GetPaginatedSubscriptionsUseCase;

describe('Get Paginated Subscriptions use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        sut = new GetPaginatedSubscriptionsUseCase(subscriptionsRepository);
    });

    it('should be able to get paginated subscriptions', async () => {
        await subscriptionsRepository.subscribe({
            mangaId: FAKE_MANGA.id,
            userId: FAKE_USER.id,
            rating: 5
        });

        await subscriptionsRepository.subscribe({
            mangaId: FAKE_MANGA.id.replace('manga_id', 'manga_id2'),
            userId: FAKE_USER.id,
            rating: 3
        });

        const { subscriptions } = await sut.execute({ page: 2, offset: 1, userId: FAKE_USER.id });

        expect(Array.isArray(subscriptions)).toBe(true);
        expect(subscriptions.length).equal(1);
        expect(subscriptions[0].mangaId).equal(FAKE_MANGA.id.replace('manga_id', 'manga_id2'));
        expect(subscriptions[0].rating).equal(3);
    });
});
