import { PrismaClient } from '@prisma/client';
import { env } from '../lib/env';

export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : []
});
