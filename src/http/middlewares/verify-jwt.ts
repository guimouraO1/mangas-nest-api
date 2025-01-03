import { FastifyRequest, FastifyReply } from "fastify";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return reply.status(401).send({
                message: "Authorization header missing or malformed."
            });
        }

        const token: any = authHeader.split(" ")[1];
        if (!token) return reply.status(401).send({ message: "Token missing" });

        await request.jwtVerify(token);
    } catch (error) {
        reply.status(401).send({ message: "Unauthorized" });
    }
}
