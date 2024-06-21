import {Document, Schema, model} from 'mongoose';

interface ISession extends Document
{
    user: Schema.Types.ObjectId;
    accessToken: string;
    refreshToken: string;
}

function formatSession(session: ISession): Partial<ISession>
{
    return {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken
    };
}

const Session = model<ISession>('Session', new Schema<ISession>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    accessToken: String,
    refreshToken: String
}), 'session');

export {ISession, Session, formatSession};
