import { FastifyRequest, FastifyReply } from 'fastify';
import { makeUnsubscribeMangaUseCase } from '../../../use-cases/_factories/make-unsubscribe-manga';
import { SubscriptionNotFoundError } from '../../../utils/errors/subscription-not-fount-error';
import { Unsubscribe } from '../../../utils/validators/subscriptions/unsubscribe-schema';

export async function unsubscribeManga(request: FastifyRequest, reply: FastifyReply) {
    const { mangaId } = request.params as Unsubscribe;

    try {
        const unsubscribeMangaUseCase = makeUnsubscribeMangaUseCase();
        await unsubscribeMangaUseCase.execute(mangaId, request.user.sub);

        return reply.status(200).send({});
    } catch (error) {
        if (error instanceof SubscriptionNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
