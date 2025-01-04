import { prisma } from "@/lib/prisma";
import { ChaptersRepository } from "../chapters-repository";

export class PrismaChaptersRepository implements ChaptersRepository {
    
    async create({subscriptionId, number}: { subscriptionId: string; number: number; }) {
        const createdChapter = await prisma.chapter.create({data: { subscriptionId, number }});

        return createdChapter;
    }

    async delete({subscriptionId, number}: { subscriptionId: string; number: number; }) {
        const deletedChapter = await prisma.chapter.delete({
            where: { 
                subscriptionId_number: {
                    subscriptionId,
                    number
                },
            },
        });

        return deletedChapter;
    }

}
