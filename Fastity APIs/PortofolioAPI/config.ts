import * as dotenv from 'dotenv';
import mongoose, {ConnectOptions} from 'mongoose';
import {z} from 'zod';
import Logger from './shared/logger';

const configSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    FASTIFY_URL: z.string().url(),
    FASTIFY_PORT: z.coerce.number().min(1).default(3000),
    FASTIFY_ADDRESS: z.string().min(1).default('0.0.0.0'),
    FASTIFY_BODY_LIMIT: z.coerce.number().min(1).default(1000000 * 1),
    FASTIFY_LOG_LEVEL: z.string().min(1).default('fatal'),
    FASTIFY_PRETTY_LOGS: z.coerce.boolean().default(true),
    FASTIFY_CLOSE_GRACE_DELAY: z.coerce.number().min(1).default(1000),
    FASTIFY_RATE_LIMIT_MAX_REQUESTS_IN_TIME_WINDOW: z.coerce.number().min(1).default(1000),
    FASTIFY_RATE_LIMIT_TIME_WINDOW_MS: z.coerce.number().min(1).default(1000 * 60),
    FASTIFY_RATE_LIMIT_RENEW_WHILE_LIMITED: z.coerce.boolean().default(true),
    MAX_LOG_MESSAGE_CHARS: z.coerce.number().min(1).default(1000),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().min(1),
    DB_NAME: z.string().min(1),
    DB_AUTH_NAME: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    JWT_SECRET: z.string().min(1)
});

type Config = z.infer<typeof configSchema>;

const parseConfig = (): Config =>
{
    let configs = configSchema.safeParse(process.env);

    if (configs.success)
    {
        return configs.data;
    }

    dotenv.config();
    configs = configSchema.safeParse(process.env);

    if (configs.success)
    {
        return configs.data;
    }

    Logger.error(`Configs are not properly set: ${configs.error}`);
    process.exit(1);
};

const configs = parseConfig();

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_AUTH_NAME
} = process.env;

export const createDbConnection = async (): Promise<void> =>
{
    try
    {
        await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTH_NAME}`,
        {
            useNewUrlParser: true
        } as ConnectOptions);

        Logger.info('Mongo: Connection through the API was a success');
    }
    catch (error)
    {
        Logger.error(`Mongo: Couldn\'t establish a connection due to:\n ${error}`);
    }
};

export default configs;