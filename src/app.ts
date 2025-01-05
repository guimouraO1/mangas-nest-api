import { fastify } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { fastifyJwt } from "@fastify/jwt";
import { userRoutes } from "./http/controllers/users/routes";
import { fastifyCookie } from "@fastify/cookie";
import { fastifyCors } from "@fastify/cors";
import {
    hasZodFastifySchemaValidationErrors,
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodFastifySchemaValidationError,
    ZodTypeProvider
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { mangaRoutes } from "./http/controllers/mangas/routes";
import { subscriptionsRoutes } from "./http/controllers/subscriptions/routes";
import { chapterRoutes } from "./http/controllers/chapters/routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyJwt, {
    secret: {
        public: env.JWT_PUBLIC_KEY,
        private: env.JWT_PRIVATE_KEY
    },
    cookie: {
        cookieName: env.REFRESH_COOKIE_NAME,
        signed: false
    },
    sign: {
        algorithm: env.JWT_ALGORITHM,
        expiresIn: env.JWT_EXPIRATION_TIME
    }
});

app.register(fastifyCookie);

app.register(fastifyCors, {
    origin: true,
    credentials: true
});

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Manga Nest API",
            version: "1.0.0"
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userRoutes);
app.register(mangaRoutes);
app.register(subscriptionsRoutes);
app.register(chapterRoutes);

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            issues: error.issues
        });
    }

    if (hasZodFastifySchemaValidationErrors(error)) {
        const validation = error.validation as ZodFastifySchemaValidationError[];

        const formattedErrors = validation.map((err) => ({
            errorCode: err.params.issue.code,
            field: err.params.issue.path.join("."),
            message: err.params.issue.message
        }));

        return reply.status(400).send({
            message: "Validation Errors",
            issues: formattedErrors
        });
    }

    if (env.NODE_ENV !== "production") {
        console.error(error);
    }

    return reply.status(500).send({ message: "Internal Server Error" });
});

export { app };
