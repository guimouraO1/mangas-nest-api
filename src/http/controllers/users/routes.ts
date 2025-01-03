import { register } from "./register.controller";
import { authenticate } from "./authenticate.controller";
import { refresh } from "./refresh.controller";
import { z } from "zod";
import { FastifyTypedInstance } from "@/@types/fastify-type";
import { env } from "@/env";

export async function userRoutes(app: FastifyTypedInstance) {
    app.get(
        "/health-check",
        {
            schema: {
                description: "Health check",
                tags: ["health-check"],
                response: {
                    200: z.object({
                        healtly: z.boolean()
                    })
                }
            }
        },
        async (_, reply) => reply.status(200).send({ healtly: true })
    );
    app.post(
        "/user",
        {
            schema: {
                description: "Create a new user",
                tags: ["users"],
                body: z.object({
                    name: z.string().max(60),
                    username: z.string().max(20).trim(),
                    email: z.string().email().max(40).trim(),
                    password: z.string().min(6).max(30)
                }),
                response: {
                    201: z.object({}).describe("User created"),
                    400: z
                        .object({
                            message: z.string(),
                            issues: z.array(
                                z.object({
                                    errorCode: z.string(),
                                    field: z.string(),
                                    message: z.string()
                                })
                            )
                        })
                        .describe("Validation errors"),
                    409: z
                        .object({
                            message: z.string()
                        })
                        .describe("E-mail or username already exists"),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe("Internal Server Error")
                }
            }
        },
        register
    );
    app.post(
        "/auth/session",
        {
            schema: {
                description: "Start new cookie Session",
                tags: ["auth"],
                body: z.object({
                    email: z.string().email(),
                    password: z.string().min(6)
                }),
                response: {
                    200: z
                        .object({
                            token: z.string()
                        })
                        .describe("Authorization Successfully"),
                    400: z
                        .object({
                            message: z.string(),
                            issues: z.array(
                                z.object({
                                    errorCode: z.string(),
                                    field: z.string(),
                                    message: z.string()
                                })
                            )
                        })
                        .describe("Validation errors"),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe("Internal Server Error")
                }
            }
        },
        authenticate
    );
    app.post(
        "/auth/end-session",
        {
            schema: {
                description: "End cookie Session",
                tags: ["auth"],
                response: {
                    200: z.object({})
                }
            }
        },
        async (_, reply) => reply.clearCookie(env.REFRESH_COOKIE_NAME).status(200).send({})
    );
    app.patch(
        "/auth/refresh-token",
        {
            schema: {
                description: "Refresh Token",
                tags: ["auth"],
                response: {
                    200: z
                        .object({
                            token: z.string()
                        })
                        .describe("Authorization Successfully"),
                    401: z
                        .object({
                            error: z.object({
                                code: z.string(),
                                name: z.string(),
                                statusCode: z.number(),
                                message: z.string()
                            })
                        })
                        .describe("Unauthorized: No Authorization in Cookies")
                }
            }
        },
        refresh
    );
}
