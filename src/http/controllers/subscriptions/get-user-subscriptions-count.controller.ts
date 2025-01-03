import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUserSubscriptionsCountUseCase } from "@/use-cases/factories/make-get-user-subscriptions-count";

export async function getUserSubscriptionsCount(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getUserSubscriptionsCountUseCase = makeGetUserSubscriptionsCountUseCase();

        const { subscriptionsCount } = await getUserSubscriptionsCountUseCase.execute({ userId: request.user.sub });

        return reply.status(200).send({ subscriptionsCount });
    } catch (error) {
        throw new Error("");
    }
}
