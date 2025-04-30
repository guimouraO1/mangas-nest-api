import { FastifyRequest, FastifyReply } from 'fastify';
import { makeSubscribeMangaUseCase } from '../../../use-cases/_factories/make-subscribe-manga';
import { AlreadySubscribedError } from '../../../utils/errors/already-subscribed-error';
import { MangaNotFoundError } from '../../../utils/errors/manga-not-found-error';
import { SubscribeRequestType } from '../../../utils/validators/subscriptions/subscribe-schema';

export async function subscribeManga(request: FastifyRequest, reply: FastifyReply) {
    const { mangaId, rating } = request.body as SubscribeRequestType;

    try {
        const subscribeMangaUseCase = makeSubscribeMangaUseCase();
        await subscribeMangaUseCase.execute({ userId: request.user.sub, mangaId, rating });

        return reply.status(201).send({});
    } catch (error) {
        if (error instanceof MangaNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof AlreadySubscribedError) {
            return reply.status(409).send({ message: error.message });
        }

        throw error;
    }
}
