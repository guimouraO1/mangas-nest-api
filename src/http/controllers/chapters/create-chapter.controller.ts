import { FastifyRequest, FastifyReply } from 'fastify';
import { ChapterAlreadyExistsError } from '../../../utils/errors/chapter-already-exists-error';
import { SubscriptionNotFoundError } from '../../../utils/errors/subscription-not-fount-error';
import { makeCreateChapterUseCase } from '../../../use-cases/_factories/make-create-chapter';
import { CreateChapterRequestBody } from '../../../utils/validators/chapters/create-chapter-schema';

export async function createChapter(request: FastifyRequest, reply: FastifyReply) {
    const { subscriptionId, number } = request.body as CreateChapterRequestBody;

    try {
        const createChapterUseCase = makeCreateChapterUseCase();
        await createChapterUseCase.execute({ subscriptionId, number });

        return reply.status(201).send({});
    } catch (error) {
        if (error instanceof SubscriptionNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof ChapterAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }

        throw error;
    }
}
