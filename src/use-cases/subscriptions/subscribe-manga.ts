import { MangasRepository } from 'src/repositories/mangas-repository';
import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { Subscribe } from 'src/utils/validators/subscriptions/subscribe-schema';
import { MangaNotFoundError } from 'src/utils/errors/manga-not-found-error';
import { AlreadySubscribedError } from 'src/utils/errors/already-subscribed-error';

export class SubscribeMangaUseCase {
    constructor(private subscriptionsRepository: SubscriptionsRepository, private mangasRepository: MangasRepository) {}

    async execute({ userId, mangaId, rating }: Subscribe) {
        const mangasExists = await this.mangasRepository.getMangaById(mangaId);
        if (!mangasExists) {
            throw new MangaNotFoundError();
        }

        const alreadySubscribed = await this.subscriptionsRepository.getSubscriptionByUserId(userId, mangaId);
        if(alreadySubscribed) {
            throw new AlreadySubscribedError();
        }

        const subscription = await this.subscriptionsRepository.subscribe({ userId, mangaId, rating });
        return subscription;
    }
}
