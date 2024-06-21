import {CustomError} from 'shared/custom-error';
import {authenticationError} from 'shared/responses';
import {ISession, Session, formatSession} from '../models/session';
import {IUser, User, formatUser} from '../models/user';
import {FastifyInstance} from 'fastify/types/instance';
import {UserPermissions} from '../shared/enums/user-permissions';
import {sha256} from 'js-sha256';

export async function register(fastify: FastifyInstance, email: string, password: string): Promise<void>
{
    const newUser: IUser = new User({
        email: email,
        password: sha256(password),
        permission: UserPermissions.AFFILIATED
    });

    if (!newUser)
    {
        throw new CustomError(authenticationError[2000]);
    }

    await newUser.save();
}

export async function login(fastify: FastifyInstance, email: string, password: string): Promise<Partial<ISession>>
{
    const user: IUser | null = await User.findOne({email: email, password: sha256(password)});

    if (!user)
    {
        throw new CustomError(authenticationError[2001]);
    }

    const tokenUser = formatUser(user);

    user.lastLogin = new Date();

    await user.save();

    const session = new Session({
        user: user._id,
        accessToken: fastify.jwt.sign({data: tokenUser}, { expiresIn: '1h' }),
        refreshToken: fastify.jwt.sign({data: tokenUser}, { expiresIn: '60d' })
    });

    return formatSession(await session.save());
}

export async function refreshUserToken(fastify: FastifyInstance, accessToken: string, refreshToken: string): Promise<Partial<ISession>>
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
            
                return formatSession(await sessionStored.save());
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
}
