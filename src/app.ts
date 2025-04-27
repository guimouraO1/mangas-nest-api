import { fastify } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import { userRoutes } from './http/controllers/users/routes';
import { fastifyCookie } from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider
} from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { mangaRoutes } from './http/controllers/mangas/routes';
import { subscriptionsRoutes } from './http/controllers/subscriptions/routes';
import { chapterRoutes } from './http/controllers/chapters/routes';
import { jwtConfig } from './utils/constants/jwt-config';
import { errorHandler } from './utils/error-handler';
import { env } from './lib/env';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, jwtConfig);
app.register(fastifyCookie);
app.register(fastifyCors, { origin: true, credentials: true });

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Manga nest Api',
            version: '1.0.0'
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, { routePrefix: '/docs' });
app.register(userRoutes);
app.register(mangaRoutes);
app.register(subscriptionsRoutes);
app.register(chapterRoutes);

app.setErrorHandler(errorHandler);

export default app;
