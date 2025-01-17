import { s3Client } from "@/lib/aws";
import { FastifyRequest, FastifyReply } from "fastify";
import { ulid } from "ulid";
import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env";

export async function uploadMangaImage(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({ fileType: z.enum(["image/png", "image/jpeg", "image/jpg"]) });

    let { fileType } = schema.parse(request.query);
    fileType = fileType.replace("image/", "") as "image/png" | "image/jpeg" | "image/jpg";

    const key = `${ulid()}.${fileType}`;

    try {
        const signedUrl = await getSignedUrl(
            s3Client,
            new PutObjectCommand({
                Bucket: env.AWS_BUCKET_NAME,
                Key: key,
                ContentType: `image/${fileType}`
            }),
            { expiresIn: 180 }
        );

        reply.status(200).send({
            signedUrl,
            fileExtension: fileType,
            key
        });
    } catch (error) {
        reply.status(500).send({
            message: "Failed to generate AWS S3 signed URL",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
