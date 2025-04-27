import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { GetPaginatedSubscriptionsUseCase } from './get-paginated-subscriptions';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';

interface GetPaginatedSubscriptionsUseCaseRequest {
    page: number;
    offset: number;
    userId: string;
}

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: GetPaginatedSubscriptionsUseCase;
let request: GetPaginatedSubscriptionsUseCaseRequest;

describe('Get Paginated Subscriptions use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        sut = new GetPaginatedSubscriptionsUseCase(subscriptionsRepository);

        request = {
            page: 1,
            offset: 4,
            userId: 'user_id'
        };
    });

    it('should be able to get paginated subscriptions list', async () => {
        await subscriptionsRepository.subscribe({
            mangaId: 'manga_id',
            userId: 'user_id',
            rating: 5
        });

        const { subscriptions } = await sut.execute(request);

        expect(Array.isArray(subscriptions)).toBe(true);
        expect(subscriptions.length).equal(1);
        expect(subscriptions[0].userId).equal('user_id');
        expect(subscriptions[0].rating).equal(5);
    });
});
