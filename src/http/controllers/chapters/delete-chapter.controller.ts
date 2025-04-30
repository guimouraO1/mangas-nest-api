import { FastifyRequest, FastifyReply } from 'fastify';
import { ChapterNotFoundError } from '../../../utils/errors/chapter-not-found-error';
import { SubscriptionNotFoundError } from '../../../utils/errors/subscription-not-fount-error';
import { makeDeleteChapterUseCase } from '../../../use-cases/_factories/make-delete-chapter';
import { DeleteChapterRequestBody } from '../../../utils/validators/chapters/delete-chapter-schema';

export async function deleteChapter(request: FastifyRequest, reply: FastifyReply) {
    const { subscriptionId, number } = request.params as DeleteChapterRequestBody;

    try {
        const deleteChapterUseCase = makeDeleteChapterUseCase();
        await deleteChapterUseCase.execute({ subscriptionId, number: +number });

        return reply.status(200).send({});
    } catch (error) {
        if (error instanceof SubscriptionNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        if (error instanceof ChapterNotFoundError) {
            return reply.status(409).send({ message: error.message });
        }

        throw error;
    }
}
