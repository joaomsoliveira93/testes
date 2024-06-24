import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import cors from '@fastify/cors';
//import {fastifyJwt} from '@fastify/jwt';
import {FastifyBaseLogger, FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest, RawServerDefault} from 'fastify';
import {ZodTypeProvider, serializerCompiler, validatorCompiler} from 'fastify-type-provider-zod';
import {IncomingMessage, ServerResponse} from 'http';
import {join} from 'path';
import /*configs,*/ {createDbConnection} from './shared/config';
import {CustomError} from './shared/custom-error';
//import {returnError} from './shared/utils';
import {authenticationError} from './shared/responses';
//import {ISession, Session} from './models/session';
//import {IUser} from './models/user';
import { ApiToken, IApiToken } from 'models/apiToken';


export type AppOptions = object & Partial<AutoloadPluginOptions>;
export type FastifyZod = FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse, FastifyBaseLogger, ZodTypeProvider>;

const options: AppOptions = {};

declare module 'fastify'
{
    interface FastifyInstance
    {
        authenticate(request: FastifyRequest, reply: FastifyReply): void;
    }
}

/*declare module '@fastify/jwt'
{
	interface FastifyJWT
    {
		user:
        {
            data: IUser;
        };
        iat: number;
        exp: number;
	}
}*/

const app: FastifyPluginAsync<AppOptions, RawServerDefault, ZodTypeProvider> = (
    fastify,
    opts
) =>
{
    createDbConnection();

    /*fastify.register(fastifyJwt, {secret: `${configs.JWT_SECRET}`});*/

    fastify.decorate('authenticate', async function(request: FastifyRequest, response: FastifyReply)
    {           
        if (!!request.headers.authorization)
        {
            /*try
            {
                await request.jwtVerify();
            }
            catch (error: any)
            {
                returnError(authenticationError[2001], response);
            }*/

            const apiToken: IApiToken | null = await ApiToken.findOne({accessToken: request.headers.authorization.split(' ')[1]});

            if (!apiToken)
            {
                throw new CustomError(authenticationError[2002]);
            }
        }
        else
        {
            throw new CustomError(authenticationError[2000]);
        }
    });

    fastify.register(cors, {
        //TODO should work around this after dev phase is done
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    });

    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    fastify = fastify.withTypeProvider<ZodTypeProvider>();

    fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        encapsulate: false,
        options: opts
    });

    fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        dirNameRoutePrefix: true,
        routeParams: true,
        ignorePattern: /^.*(?:test|spec)\.js$/

    });

    return Promise.resolve();
};

export default app;
export {app, options};

