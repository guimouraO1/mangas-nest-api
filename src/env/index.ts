import "dotenv/config";
import { z } from "zod";

const envShema = z.object({
    NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),

    JWT_PUBLIC_KEY: z.string(),
    JWT_PRIVATE_KEY: z.string(),
    JWT_EXPIRATION_TIME: z.string(),
    JWT_ALGORITHM: z.enum(["RS256", "HS256"]).default("RS256"),

    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_BUCKET_NAME: z.string(),

    REFRESH_COOKIE_NAME: z.string().default("refreshToken")
});

const _env = envShema.safeParse(process.env);

if (_env.success === false) {
    console.error("Invalid environment variables.", _env.error.format());

    throw new Error("Invalid enviroment variables.");
}

export const env = _env.data;
