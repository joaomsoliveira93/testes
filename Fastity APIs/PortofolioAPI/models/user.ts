import {UserPermissions} from 'shared/enums/user-permissions';
import {Document, Schema, model} from 'mongoose';

interface IUser extends Document
{
    email?: string;
    password?: string;
    permission?: UserPermissions;
    lastLogin?: Date;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function formatUser(user: any): Partial<IUser>
{
    return {
        id: user._id,
        email: user.email,
        permission: user.permission,
        lastLogin: user.lastLogin
    };
}

const User = model<IUser>('User', new Schema<IUser>({
    email: String,
    password: String,
    permission: Number,
    lastLogin: Date
}), 'user');

export {IUser, User, formatUser};

