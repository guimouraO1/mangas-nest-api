import { makeCreateChapterUseCase } from "@/use-cases/factories/make-create-chapter";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function createChapter(request: FastifyRequest, reply: FastifyReply) {
    const createChapterBodySchema = z.object({
        subscriptionId: z.string(),
        number: z.number()
    });

    const { subscriptionId, number } = createChapterBodySchema.parse(request.body);

    try {
        const createChapterUseCase = makeCreateChapterUseCase();

        await createChapterUseCase.execute({ subscriptionId, number, userId: request.user.sub });

        return reply.status(201).send({});
    } catch (error) {
        throw new Error("");
    }
}
