import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import {FastifyPluginAsync} from 'fastify';
import {jsonSchemaTransform} from 'fastify-type-provider-zod';
import {OpenAPIV3} from 'openapi-types';
import {z} from 'zod';

const errorsSchema = z.object(
    {
        errors: z.object(
            {
                name: z.string(),
                message: z.string(),
                statusCode: z.number()
            })
            .passthrough()
            .array()
            .nonempty()
    });

export const routeSchema =
{
    response:
    {
        ['4xx']: errorsSchema.describe('Invalid payload sent to the server. The server will not process it'),
        ['5xx']: errorsSchema.describe('Valid payload sent to the server. The server had an error while processing it')
    }
};

const accessToken: OpenAPIV3.HttpSecurityScheme =
{
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'jwt'
};

const apiKey: OpenAPIV3.ApiKeySecurityScheme =
{
    type: 'apiKey',
    in: 'header',
    name: 'x-api-key'
};

const openApiSchema =
{
    info:
    {
        title: '"Porfolio" API',
        description: 'API for the "Portfolio" App',
        version: '0.0.0'
    },
    tags:
        [
            {
                name: 'auth',
                description: 'Authentication related endpoints'
            },
            {
                name: 'user',
                description: 'User related endpoints'
            }
        ],
    components:
    {
        securitySchemes:
        {
            accessToken,
            apiKey
        }
    }
};

const plugin: FastifyPluginAsync = async (fastify) =>
{
    await fastify.register(swagger,
        {
            openapi: openApiSchema,
            transform: jsonSchemaTransform
        });

    await fastify.register(swaggerUi,
        {
            routePrefix: '/docs'
        });
};

export default plugin;
