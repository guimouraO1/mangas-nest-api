import { FastifyRequest, FastifyReply } from 'fastify';
import { makeUnsubscribeMangaUseCase } from 'src/use-cases/_factories/make-unsubscribe-manga';
import { SubscriptionNotFoundError } from 'src/utils/errors/subscription-not-fount-error';
import { Unsubscribe } from 'src/utils/validators/subscriptions/unsubscribe-schema';

export async function unsubscribeManga(request: FastifyRequest, reply: FastifyReply) {
    const { subscriptionId } = request.params as Unsubscribe;

    try {
        const unsubscribeMangaUseCase = makeUnsubscribeMangaUseCase();
        await unsubscribeMangaUseCase.execute(subscriptionId);

        return reply.status(200).send({});
    } catch (error) {
        if (error instanceof SubscriptionNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
