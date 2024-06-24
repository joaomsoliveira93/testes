import {Document, Schema, model} from 'mongoose';

interface IApiToken extends Document
{
    accessToken: string;
}

function formatApiToken(session: IApiToken): Partial<IApiToken>
{
    return {
        accessToken: session.accessToken
    };
}

const ApiToken = model<IApiToken>('Session', new Schema<IApiToken>({
    accessToken: String,
}), 'apiToken');

export {IApiToken, ApiToken, formatApiToken};
