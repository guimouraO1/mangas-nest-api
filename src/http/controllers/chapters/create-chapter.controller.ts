import { FastifyRequest, FastifyReply } from 'fastify';
import { ChapterAlreadyExistsError } from 'src/use-cases/errors/chapter-already-exists-error';
import { SubscriptionNotFoundError } from 'src/use-cases/errors/subscription-not-fount-error';
import { makeCreateChapterUseCase } from 'src/use-cases/factories/make-create-chapter';
import { CreateChapterRequestBody } from 'src/utils/validators/chapters/create-chapter-schema';

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
