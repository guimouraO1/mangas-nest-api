import { FastifyRequest, FastifyReply } from 'fastify';
import { makeUnsubscribeMangaUseCase } from 'src/use-cases/factories/make-unsubscribe-manga';
import { z } from 'zod';

export async function unsubscribeManga(request: FastifyRequest, reply: FastifyReply) {
    const unsubscribeMangaBodySchema = z.object({
        subscriptionId: z.string()
    });

    const { subscriptionId } = unsubscribeMangaBodySchema.parse(request.params);
    console.log(subscriptionId);
    try {
        const unsubscribeMangaUseCase = makeUnsubscribeMangaUseCase();

        await unsubscribeMangaUseCase.execute({ subscriptionId, userId: request.user.sub });

        return reply.status(200).send({});
    } catch (error) {
        throw new Error('');
    }
}
