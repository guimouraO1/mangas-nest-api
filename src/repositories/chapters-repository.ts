import { CreateChapterRequestBody } from 'src/utils/validators/chapters/create-chapter-schema';
import { DeleteChapterRequestBody } from 'src/utils/validators/chapters/delete-chapter-schema';
import { GetChapterRequestBody } from 'src/utils/validators/chapters/get-chapter-schema';

export type Chapter = {
    number: number;
    subscriptionId: string;
    id: string;
}

export interface ChaptersRepository {
    create(data: CreateChapterRequestBody): Promise<Chapter>;
    delete(data: DeleteChapterRequestBody): Promise<Chapter | null>;
    get(data: GetChapterRequestBody): Promise<Chapter | null>;
}
