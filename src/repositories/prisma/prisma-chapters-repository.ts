import { prisma } from '../../lib/prisma';
import { ChaptersRepository } from '../chapters-repository';
import { CreateChapterRequestBody } from '../../utils/validators/chapters/create-chapter-schema';
import { DeleteChapterRequestBody } from '../../utils/validators/chapters/delete-chapter-schema';
import { GetChapterRequestBody } from '../../utils/validators/chapters/get-chapter-schema';

export class PrismaChaptersRepository implements ChaptersRepository {
    async get(data: GetChapterRequestBody) {
        const chapter = await prisma.chapter.findUnique({
            where: {
                subscriptionId_number: {
                    subscriptionId: data.subscriptionId,
                    number: data.number
                }
            }
        });

        return chapter;
    }

    async create({ subscriptionId, number }: CreateChapterRequestBody) {
        const createdChapter = await prisma.chapter.create({ data: { subscriptionId, number } });
        return createdChapter;
    }

    async delete({ subscriptionId, number }: DeleteChapterRequestBody) {
        const deletedChapter = await prisma.chapter.delete({ where: { subscriptionId_number: { subscriptionId, number } } });
        return deletedChapter;
    }
}
