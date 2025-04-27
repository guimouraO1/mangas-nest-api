import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetPaginatedMangasUseCase } from 'src/use-cases/_factories/make-get-paginated-mangas';
import { GetPaginatedMangas } from 'src/utils/validators/mangas/get-manga-schema';

export async function getPaginatedMangas(request: FastifyRequest, reply: FastifyReply) {
    const { page, offset } = request.query as GetPaginatedMangas;
    try {
        const getMangaUseCase = makeGetPaginatedMangasUseCase();
        const mangas = await getMangaUseCase.execute({ page: +page, offset: +offset });
        return reply.status(200).send(mangas);
    } catch (error) {
        throw new Error('');
    }
}
