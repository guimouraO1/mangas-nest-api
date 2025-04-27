import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetPaginatedMangasUseCase } from 'src/use-cases/factories/make-get-paginated-mangas';

export async function getPaginatedMangas(request: FastifyRequest, reply: FastifyReply) {
    const getPaginatedMangasSchema = z.object({
        page: z.string().transform(Number).pipe(z.number().gt(0)),
        offset: z.string().transform(Number).pipe(z.number().gt(0))
    });

    const { page, offset } = getPaginatedMangasSchema.parse(request.query);

    try {
        const getMangaUseCase = makeGetPaginatedMangasUseCase();

        const { mangas } = await getMangaUseCase.execute({ page, offset, userId: request.user.sub });

        return reply.status(200).send({ mangas });
    } catch (error) {
        throw new Error('');
    }
}
