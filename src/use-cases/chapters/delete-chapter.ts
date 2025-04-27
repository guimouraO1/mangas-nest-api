import { ChaptersRepository } from 'src/repositories/chapters-repository';
import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { SubscriptionNotFoundError } from '../../utils/errors/subscription-not-fount-error';
import { DeleteChapterRequestBody } from 'src/utils/validators/chapters/delete-chapter-schema';
import { ChapterNotFoundError } from '../../utils/errors/chapter-not-found-error';

export class DeleteChapterUseCase {
    constructor(private chaptersRepository: ChaptersRepository, private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ subscriptionId, number }: DeleteChapterRequestBody) {
        const subscription = await this.subscriptionsRepository.getSubscriptionById(subscriptionId);

        if (!subscription) {
            throw new SubscriptionNotFoundError();
        }

        const isChapterExists = await this.chaptersRepository.get({ subscriptionId, number });
        if(!isChapterExists) {
            throw new ChapterNotFoundError();
        }

        const chapter = await this.chaptersRepository.delete({ subscriptionId, number });
        return chapter;
    }
}
