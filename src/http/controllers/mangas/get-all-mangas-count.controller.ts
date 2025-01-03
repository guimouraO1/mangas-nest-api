import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetAllMangasCountUseCase } from "@/use-cases/factories/make-get-all-mangas-count";

export async function getAllMangasCount(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getAllMangasCountUseCase = makeGetAllMangasCountUseCase();

        const { mangasCount } = await getAllMangasCountUseCase.execute();

        return reply.status(200).send({ mangasCount });
    } catch (error) {
        throw new Error("");
    }
}
