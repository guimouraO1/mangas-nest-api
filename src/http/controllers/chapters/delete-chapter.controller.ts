import { makeDeleteChapterUseCase } from "@/use-cases/factories/make-delete-chapter";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteChapter(request: FastifyRequest, reply: FastifyReply) {
    const deleteChapterParamsSchema = z.object({
        subscriptionId: z.string(),
        number: z.number().transform(Number)
    });

    const { subscriptionId, number } = deleteChapterParamsSchema.parse(request.params);

    try {
        const deleteChapterUseCase = makeDeleteChapterUseCase();

        await deleteChapterUseCase.execute({ subscriptionId, number, userId: request.user.sub });

        return reply.status(200).send({});
    } catch (error) {
        throw new Error("");
    }
}
