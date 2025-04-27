import { z } from 'zod';

export const CreateUserRequestSchema = z.object({
    name: z.string().max(60),
    username: z.string().max(20).trim(),
    email: z.string().email().max(40).trim(),
    password: z.string().min(6).max(30)
});

export type CreateUserRequestSchemaType = z.infer<typeof CreateUserRequestSchema>;

export const CreateUserRequestSchemaPasswordHash = z.object({
    name: z.string().max(60),
    username: z.string().max(20).trim(),
    email: z.string().email().max(40).trim(),
    password_hash: z.string().min(6).max(30)
});

export type CreateUserRequestSchemaPasswordHash = z.infer<typeof CreateUserRequestSchemaPasswordHash>;