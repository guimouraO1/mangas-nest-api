import { CreateMangaType } from 'src/utils/validators/mangas/create-manga-schema';
import { GetPaginatedMangas, GetPaginatedMangasResponse } from 'src/utils/validators/mangas/get-manga-schema';

type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
export type Manga = {
    name: string;
    url: string;
    date: WeekDay;
    id: string;
    about: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface MangasRepository {
    create(data: CreateMangaType): Promise<Manga>;
    getPaginatedMangas({ page, offset, userId }: GetPaginatedMangas): Promise<GetPaginatedMangasResponse>;
    getMangaById(id: string): Promise<Manga | null>;
}
