import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetPaginatedSubscriptionsUseCase } from '../../../use-cases/_factories/make-get-paginated-subscriptions';
import { GetPaginatedSubscriptionsRequest } from '../../../utils/validators/subscriptions/get-subscriptions-schema';

export async function getUserPaginatedSubscriptions(request: FastifyRequest, reply: FastifyReply) {
    const { page, offset } = request.query as GetPaginatedSubscriptionsRequest;

    try {
        const getUserPaginatedSubscriptionsUseCase = makeGetPaginatedSubscriptionsUseCase();
        const subscriptions = await getUserPaginatedSubscriptionsUseCase.execute({ page: +page, offset: +offset, userId: request.user.sub });

        return reply.status(200).send(subscriptions);
    } catch (error) {
        throw new Error('');
    }
}
