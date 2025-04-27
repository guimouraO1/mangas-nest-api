import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetPaginatedSubscriptionsUseCase } from 'src/use-cases/factories/make-get-paginated-subscriptions';

export async function getUserPaginatedSubscriptions(request: FastifyRequest, reply: FastifyReply) {
    const getUserPaginatedMangasSchema = z.object({
        page: z.string().transform(Number).pipe(z.number().gt(0)),
        offset: z.string().transform(Number).pipe(z.number().gt(0))
    });

    const { page, offset } = getUserPaginatedMangasSchema.parse(request.query);

    try {
        const getUserPaginatedSubscriptionsUseCase = makeGetPaginatedSubscriptionsUseCase();

        const { subscriptions } = await getUserPaginatedSubscriptionsUseCase.execute({ page, offset, userId: request.user.sub });

        return reply.status(200).send({ subscriptions });
    } catch (error) {
        throw new Error('');
    }
}
