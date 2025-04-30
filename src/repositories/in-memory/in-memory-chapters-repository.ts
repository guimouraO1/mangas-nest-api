import { GetChapterRequestBody } from '../../utils/validators/chapters/get-chapter-schema';
import { Chapter, ChaptersRepository } from '../chapters-repository';
import { CreateChapterRequestBody } from '../../utils/validators/chapters/create-chapter-schema';
import { DeleteChapterRequestBody } from '../../utils/validators/chapters/delete-chapter-schema';

export class InMemoryChaptersRepository implements ChaptersRepository {
    public chapters: Chapter[] = [];

    async get(data: GetChapterRequestBody) {
        const chapter = this.chapters.find((chapter) => chapter.subscriptionId === data.subscriptionId && chapter.number === data.number);
        return chapter ?? null;
    }

    async create({ subscriptionId, number }: CreateChapterRequestBody) {
        const chapter = {
            id: crypto.randomUUID(),
            number,
            subscriptionId
        };

        this.chapters.push(chapter);
        return chapter;
    }

    async delete({ subscriptionId, number }: DeleteChapterRequestBody) {
        const removedChapter = this.chapters.find((chapter) => chapter.subscriptionId === subscriptionId && chapter.number === number);
        this.chapters = this.chapters.filter((chapter) => !(chapter.subscriptionId === subscriptionId && chapter.number === number));

        return removedChapter ?? null;
    }
}
