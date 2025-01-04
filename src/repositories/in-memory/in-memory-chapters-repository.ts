import { ChaptersRepository } from "../chapters-repository";
import { Chapter } from "@prisma/client";

export class InMemoryChaptersRepository implements ChaptersRepository {
    public chapters: Chapter[] = [];

    async create({ subscriptionId, number }: { subscriptionId: string; number: number }) {
        this.chapters.push({
            id: crypto.randomUUID(),
            number,
            subscriptionId
        });

        return {
            id: crypto.randomUUID(),
            number,
            subscriptionId
        };
    }

    async delete({ subscriptionId, number }: { subscriptionId: string; number: number }) {
        const removedChapter = this.chapters.find((chapter) => chapter.subscriptionId === subscriptionId && chapter.number === number);

        if (!removedChapter) {
            throw new Error(`Chapter with subscriptionId ${subscriptionId} and number ${number} not found`);
        }

        this.chapters = this.chapters.filter((chapter) => !(chapter.subscriptionId === subscriptionId && chapter.number === number));

        return removedChapter;
    }
}
