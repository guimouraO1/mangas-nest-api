import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { GetUserSubscriptionsCountUseCase } from './get-user-subscriptions-count';
import { InMemorySubscriptionsRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository';

interface GetUserSubscriptionsCountUseCaseRequest {
    userId: string;
}

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: GetUserSubscriptionsCountUseCase;
let request: GetUserSubscriptionsCountUseCaseRequest;

describe('Get user subscriptions count use case', () => {
    beforeEach(() => {
        subscriptionsRepository = new InMemorySubscriptionsRepository();
        sut = new GetUserSubscriptionsCountUseCase(subscriptionsRepository);

        request = {
            userId: 'user_id'
        };
    });

    it('should be able to get user subscriptions count', async () => {
        await subscriptionsRepository.subscribe({
            mangaId: 'manga_id',
            userId: 'user_id',
            rating: 5
        });

        await subscriptionsRepository.subscribe({
            mangaId: 'manga_id_2',
            userId: 'user_id',
            rating: 4
        });

        const { subscriptionsCount } = await sut.execute(request);

        expect(Number.isInteger(subscriptionsCount)).toBe(true);
        expect(subscriptionsCount).equal(2);
    });
});
