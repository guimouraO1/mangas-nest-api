import { FastifyTypedInstance } from "@/@types/fastify-type";
import { createChapter } from "./create-chapter.controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { z } from "zod";
import { deleteChapter } from "./delete-chapter.controller";

export async function chapterRoutes(app: FastifyTypedInstance) {
    app.post(
        "/chapter",
        {
            onRequest: [verifyJwt],
            schema: {
                description: "Create chapter",
                tags: ["chapters"],
                security: [
                    {
                        BearerAuth: []
                    }
                ],
                body: z.object({
                    subscriptionId: z.string(),
                    number: z.number()
                }),
                response: {
                    201: z.object({}).describe("Chapter created successfully"),
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
                        .describe("Bad Request"),
                    401: z
                        .object({
                            message: z.string()
                        })
                        .describe("Unauthorized"),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe("Internal Server Error")
                }
            }
        },
        createChapter
    );

    app.delete(
        "/chapter/:subscriptionId/:number",
        {
            onRequest: [verifyJwt],
            schema: {
                description: "Delete chapter",
                tags: ["chapters"],
                security: [
                    {
                        BearerAuth: []
                    }
                ],
                params: z.object({
                    subscriptionId: z.string(),
                    number: z.string().transform(Number)
                }),
                response: {
                    200: z.object({}).describe("Chapter deleted successfully"),
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
                        .describe("Bad Request"),
                    401: z
                        .object({
                            message: z.string()
                        })
                        .describe("Unauthorized"),
                    500: z
                        .object({
                            message: z.string()
                        })
                        .describe("Internal Server Error")
                }
            }
        },
        deleteChapter
    );
}
