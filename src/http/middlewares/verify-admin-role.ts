import { FastifyRequest, FastifyReply } from "fastify";

export async function authorizeAdminOnly(request: FastifyRequest, reply: FastifyReply) {
    const { role } = request.user;

    if (role !== "admin") {
        return reply.status(403).send({ message: "Forbidden" });
    }
}
