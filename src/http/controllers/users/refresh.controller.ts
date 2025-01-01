import { env } from "@/env";
import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({ onlyCookie: true });

        const { role } = request.user;

        const token = await reply.jwtSign(
            { role },
            {
                sign: {
                    sub: request.user.sub
                }
            }
        );

        const refreshToken = await reply.jwtSign(
            { role },
            {
                sign: {
                    sub: request.user.sub,
                    expiresIn: "7d"
                }
            }
        );

        reply
            .setCookie(env.REFRESH_COOKIE_NAME, refreshToken, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: true
            })
            .status(200)
            .send({ token });
    } catch (error: any) {
        if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_COOKIE") {
            return reply.status(401).send({
                error: {
                    code: error.code,
                    name: error.name,
                    statusCode: error.statusCode,
                    message: error.message
                }
            });
        }

        reply.status(400).send({ error });
    }
}
