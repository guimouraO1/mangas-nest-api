import { Chapter } from "@prisma/client";

export interface ChaptersRepository {
    create(data: { subscriptionId: string; number: number }): Promise<Chapter>;
    delete(data: { subscriptionId: string; number: number }): Promise<Chapter>;
}
