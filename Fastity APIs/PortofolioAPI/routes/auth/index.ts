import {getApiTokens, login, register, userImg} from 'controllers/auth';
import {returnError, returnSuccess} from 'shared/utils';
import {authenticationSuccess} from 'shared/responses';
import {FastifyPluginAsync} from 'fastify';
import {z as schemaType} from 'zod';

const route: FastifyPluginAsync = async (fastify) =>
{
    const authRegisterBodySchema = schemaType.object({
        email: schemaType.string(),
        name: schemaType.string(),
        password: schemaType.string()
    });

    const authLoginBodySchema = schemaType.object({
        email: schemaType.string(),
        password: schemaType.string()
    });

    /*const refreshTokenBodySchema = schemaType.object({
        accessToken: schemaType.string(),
        refreshToken: schemaType.string()
    });*/

    const userImgBodySchema = schemaType.object({
        email: schemaType.string()
    });

    type AuthRegisterBody = schemaType.infer<typeof authRegisterBodySchema>;
    type AuthLoginBody = schemaType.infer<typeof authLoginBodySchema>;
    //type RefreshTokenBody = schemaType.infer<typeof refreshTokenBodySchema>;
    type userImgBody = schemaType.infer<typeof userImgBodySchema>;

    const authTag = 'Authentication';

    fastify.route<{Body: AuthRegisterBody}>({
        method: 'POST',
        url: '/register',
        schema:
        {
            tags: [authTag],
            security: [{accessToken: []}],
            body: authRegisterBodySchema
        },
        preHandler: fastify.authenticate,
        handler: async (request, response) =>
        {
            try
            {
                await register(fastify, request.body.email,request.body.name, request.body.password);

                returnSuccess(authenticationSuccess[2000], response);
            }
            catch (error: any)
            {
                returnError(error, response);
            }
        }
    });

    fastify.route<{Body: AuthLoginBody}>({
        method: 'POST',
        url: '/login',
        schema:
        {
            tags: [authTag],
            security: [{accessToken: []}],
            body: authLoginBodySchema
        },
        preHandler: fastify.authenticate,
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

    /*fastify.route({
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
                console.log(request.body)
                const session = await refreshUserToken(fastify, request.body.accessToken, request.body.refreshToken);
                
                returnSuccess(authenticationSuccess[2003], response, session);
            }
            catch (error: any)
            {
                console.log(error)
                returnError(error, response);
            }
        }
    });*/

    fastify.route<{Body: userImgBody}>({
        method: 'POST',
        url: '/userImg',
        schema:
        {
            tags: [authTag],
            security: [{accessToken: []}],
            body: userImgBodySchema
        },
        preHandler: fastify.authenticate,
        handler: async (request, response) =>
        {
            try
            {
                
                const session = await userImg(fastify, request.body.email);
                returnSuccess(authenticationSuccess[2001], response, session);
            }
            catch (error: any)
            {
                returnError(error, response);
            }
        }
    });

    fastify.route({
        method: 'GET',
        url: '/apiTokens',
        schema: {
          tags: [authTag],
          security: [{ accessToken: [] }],
        },
        preHandler: fastify.authenticate,
        handler: async (request, response) => {
          try {
            const apiTokens = await getApiTokens(fastify);
            returnSuccess(authenticationSuccess[2006], response, apiTokens);
          } catch (error: any) {
            returnError(error, response);
          }
        },
      });

    return Promise.resolve();
};

export default route;
