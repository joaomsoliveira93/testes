import {CustomError} from 'shared/custom-error';
import {authenticationError} from 'shared/responses';
//import {ISession, Session, formatSession} from '../models/session';
import {IUser, User } from '../models/user';
import {FastifyInstance} from 'fastify/types/instance';
import {UserPermissions} from '../shared/enums/user-permissions';
import {sha256} from 'js-sha256';
import { ApiToken, IApiToken } from 'models/apiToken';

export async function getApiTokens(fastify: FastifyInstance)
{
    const apiTokens: IApiToken[] | null = await ApiToken.find();

    if (!apiTokens)
    {
        throw new CustomError(authenticationError[4001]);
    }

    return apiTokens;
}

export async function register(fastify: FastifyInstance, email: string,name: string, password: string): Promise<void>
{
    const newUser: IUser = new User({
        email: email,
        name: name,
        password: sha256(password),
        permission: UserPermissions.AFFILIATED
    });

    if (!newUser)
    {
        throw new CustomError(authenticationError[2000]);
    }

    await newUser.save();
}

export async function login(fastify: FastifyInstance, email: string, password: string)
{
    const user: IUser | null = await User.findOne({email: email, password: sha256(password)});

    if (!user)
    {
        throw new CustomError(authenticationError[2001]);
    }

    //const tokenUser = formatUser(user);

    user.lastLogin = new Date();

    await user.save();

    /*const session = new Session({
        user: user._id,
        accessToken: fastify.jwt.sign({data: tokenUser}, { expiresIn: '1h' }),
        refreshToken: fastify.jwt.sign({data: tokenUser}, { expiresIn: '60d' })
    });

    const savedSession = await session.save();
    const formattedSession = formatSession(savedSession);*/

    return {
        //...formattedSession,
        email: user.email,
        name: user.name
    };
}

/*export async function refreshUserToken(fastify: FastifyInstance, accessToken: string, refreshToken: string)
{
    const sessionStored: ISession | null = await Session.findOne({accessToken: accessToken, refreshToken: refreshToken});

    if (!sessionStored)
    {
        throw new CustomError(authenticationError[2002]);
    }
    else
    {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const user: IUser | null = await User.findOne({_id: sessionStored.user});
    
        if (!user)
        {
            throw new CustomError(authenticationError[2001]);
        }
        else
        {
            try
            {
                // eslint-disable-next-line @typescript-eslint/await-thenable
                await fastify.jwt.verify(refreshToken);
            
                sessionStored.accessToken = fastify.jwt.sign({data: formatUser(user)}, { expiresIn: '1h' });
                const savedSession = await sessionStored.save();
                const formattedSession = formatSession(savedSession);

                return {
                    ...formattedSession,
                    email: user.email,
                    name: user.name
                };
            }
            catch (error)
            {
                throw new CustomError(authenticationError[2001]);
            }
        }
    }
}

export async function revokeSessions(userId: string): Promise<void>
{
    await Session.deleteMany({user: userId});
}*/

export async function userImg(fastify: FastifyInstance, email: string)
{
    const user: IUser | null = await User.findOne({email: email});

    if (!user)
    {
        throw new CustomError(authenticationError[2001]);
    }

    return {
        img: user.img
    };
}