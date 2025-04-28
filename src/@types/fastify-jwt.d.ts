import '@fastify/jwt';

type Role = 'user' | 'admin';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            sub: string;
            role: Role;
        };
    }
}
