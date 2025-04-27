import { FastifyRequest, FastifyReply } from 'fastify';
import { MakeGetSubscriptionByIdUseCase } from 'src/use-cases/_factories/make-get-subscription-by-id-use-case';

export async function authorizeOwnerOrAdminParams(request: FastifyRequest, reply: FastifyReply) {
    const data = request.params as { subscriptionId: string };

    if (request.user.role === 'admin') {
        return;
    }

    const getSubscriptionByIdUseCase = MakeGetSubscriptionByIdUseCase();
    const subscription = await getSubscriptionByIdUseCase.execute({ subscriptionId: data.subscriptionId });

    if (!subscription) {
        return reply.status(404).send({ message: 'Subscription not found' });
    }

    const isOwner = request.user.sub === subscription.userId;
    if (!isOwner) {
        return reply.status(403).send({ message: 'Forbidden' });
    }
}
