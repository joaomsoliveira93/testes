import {login, refreshUserToken, revokeSessions, register} from 'controllers/auth';
import {returnError, returnSuccess} from 'shared/utils';
import {authenticationSuccess} from 'shared/responses';
import {FastifyPluginAsync} from 'fastify';
import {z as schemaType} from 'zod';

const route: FastifyPluginAsync = async (fastify) =>
{
    const authBodySchema = schemaType.object({
        email: schemaType.string(),
        password: schemaType.string()
    });

    const refreshTokenBodySchema = schemaType.object({
        accessToken: schemaType.string(),
        refreshToken: schemaType.string()
    });

    type AuthBody = schemaType.infer<typeof authBodySchema>;
    type RefreshTokenBody = schemaType.infer<typeof refreshTokenBodySchema>;

    const authTag = 'auth';

    fastify.route<{Body: AuthBody}>({
        method: 'POST',
        url: '/register',
        schema:
        {
            tags: [authTag],
            security: [{accessToken: []}],
            body: authBodySchema
        },
        handler: async (request, response) =>
        {
            try
            {
                await register(fastify, request.body.email, request.body.password);

                returnSuccess(authenticationSuccess[2000], response);
            }
            catch (error: any)
            {
                returnError(error, response);
            }
        }
    });

    fastify.route<{Body: AuthBody}>({
        method: 'POST',
        url: '/login',
        schema:
        {
            tags: [authTag],
            security: [{accessToken: []}],
            body: authBodySchema
        },
        handler: async (request, response) =>
        {
            try
            {
                const session = await login(fastify, request.body.email, request.body.password);

                returnSuccess(authenticationSuccess[2001], response, session);
            }
            catch (error: any)
            {
                returnError(error, response);
            }
        }
    });

    fastify.route({
        method: 'DELETE',
        url: '/logout',
        schema:
        {
            tags: [authTag],
            security: [{accessToken: []}]
        },
        preHandler: fastify.authenticate,
        handler: async (request, response) =>
        {
            try
            {
                await revokeSessions(request.user.data.id);

                returnSuccess(authenticationSuccess[2002], response);
            }
            catch (error: any)
            {
                returnError(error, response);
            }
        }
    });

    fastify.route<{Body: RefreshTokenBody}>({
        method: 'PUT',
        url: '/refresh-token',
        schema:
        {
            tags: [authTag],
            security: [{accessToken: []}],
            body: refreshTokenBodySchema
        },
        handler: async (request, response) =>
        {
            try
            {
                const session = await refreshUserToken(fastify, request.body.accessToken, request.body.refreshToken);
                
                returnSuccess(authenticationSuccess[2003], response, session);
            }
            catch (error: any)
            {
                returnError(error, response);
            }
        }
    });

    return Promise.resolve();
};

export default route;
