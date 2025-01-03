// import { z } from "zod";
// import { FastifyTypedInstance } from "@/@types/fastify-type";
// import { verifyJwt } from "@/http/middlewares/verify-jwt";

// export async function subscriptionsRoutes(app: FastifyTypedInstance) {
//     app.get(
//         "/subscriptions",
//         {
//             onRequest: [verifyJwt],
//             schema: {
//                 description: "Get Paginated Subscriptions",
//                 tags: ["subscriptions"],
//                 security: [
//                     {
//                         BearerAuth: []
//                     }
//                 ],
//                 querystring: z.object({
//                     page: z.string(),
//                     offset: z.string()
//                 }),
//                 response: {
//                     200: z.object({
//                         mangas: z
//                             .array(
//                                 z.object({
//                                     id: z.string(),
//                                     name: z.string(),
//                                     date: z.string(),
//                                     url: z.string(),
//                                     about: z.string().nullable(),
//                                     createdAt: z.date(),
//                                     updatedAt: z.date()
//                                 })
//                             )
//                             .describe("Successfully Get Paginated Subscriptions")
//                     }),
//                     400: z
//                         .object({
//                             message: z.string(),
//                             issues: z.array(
//                                 z.object({
//                                     errorCode: z.string(),
//                                     field: z.string(),
//                                     message: z.string()
//                                 })
//                             )
//                         })
//                         .describe("Validation errors"),
//                     401: z
//                         .object({
//                             message: z.string()
//                         })
//                         .describe("Unauthorized"),
//                     500: z
//                         .object({
//                             message: z.string()
//                         })
//                         .describe("Internal Server Error")
//                 }
//             }
//         },
//         getPaginatedSubscriptions
//     );
// }
