import { FastifyRequest, FastifyReply } from 'fastify';
import { makeCreateMangaUseCase } from 'src/use-cases/_factories/make-create-manga-use-case';
import { CreateMangaType } from 'src/utils/validators/mangas/create-manga-schema';

export async function createManga(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as CreateMangaType;

    try {
        const createMangaUseCase = makeCreateMangaUseCase();
        await createMangaUseCase.execute(data);

        return reply.status(201).send({});
    } catch (error) {
        throw new Error('');
    }
}
