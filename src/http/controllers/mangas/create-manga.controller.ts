import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateMangaUseCase } from "@/use-cases/factories/make-create-manga-use-case";

export async function createManga(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const createMangaBodySchema = z.object({
        name: z.string().max(60),
        url: z.string().url(),
        date: z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])
    });

    const { name, url, date } = createMangaBodySchema.parse(request.body);

    try {
        const createMangaUseCase = makeCreateMangaUseCase();

        await createMangaUseCase.execute({ name, date, url });

        return reply.status(201).send({});
    } catch (error) {
        throw new Error("");
    }
}
