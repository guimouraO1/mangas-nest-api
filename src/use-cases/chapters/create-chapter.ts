import { ChaptersRepository } from 'src/repositories/chapters-repository';
import { SubscriptionsRepository } from 'src/repositories/subscriptions-repository';
import { CreateChapterRequestBody } from 'src/utils/validators/chapters/create-chapter-schema';
import { SubscriptionNotFoundError } from '../../utils/errors/subscription-not-fount-error';
import { ChapterAlreadyExistsError } from '../../utils/errors/chapter-already-exists-error';

export class CreateChapterUseCase {
    constructor(private chaptersRepository: ChaptersRepository, private subscriptionsRepository: SubscriptionsRepository) {}

    async execute({ subscriptionId, number }: CreateChapterRequestBody) {
        const subscription = await this.subscriptionsRepository.getSubscriptionById(subscriptionId);
        if (!subscription) {
            throw new SubscriptionNotFoundError();
        }

        const isChapterAlreadyExists = await this.chaptersRepository.get({ subscriptionId, number });
        if(isChapterAlreadyExists) {
            throw new ChapterAlreadyExistsError();
        }

        const chapter = await this.chaptersRepository.create({ subscriptionId, number });
        return chapter;
    }
}
