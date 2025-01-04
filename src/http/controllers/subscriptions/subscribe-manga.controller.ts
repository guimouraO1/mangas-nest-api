import { makeSubscribeMangaUseCase } from "@/use-cases/factories/make-subscribe-manga";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function subscribeManga(request: FastifyRequest, reply: FastifyReply) {
    const subscribeMangaBodySchema = z.object({
        mangaId: z.string(),
        rating: z.number()
    });

    const { mangaId, rating } = subscribeMangaBodySchema.parse(request.body);

    try {
        const subscribeMangaUseCase = makeSubscribeMangaUseCase();

        await subscribeMangaUseCase.execute({ userId: request.user.sub, mangaId, rating });

        return reply.status(200).send({});
    } catch (error) {
        throw new Error("");
    }
}
