import {UserPermissions} from 'shared/enums/user-permissions';
import {Document, Schema, model} from 'mongoose';

interface IUser extends Document
{
    email?: string;
    name?: string;
    password?: string;
    img?:string;
    permission?: UserPermissions;
    lastLogin?: Date;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function formatUser(user: any): Partial<IUser>
{
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        img:user.img,
        permission: user.permission,
        lastLogin: user.lastLogin
    };
}

const User = model<IUser>('User', new Schema<IUser>({
    email: String,
    name: String,
    password: String,
    img:String,
    permission: Number,
    lastLogin: Date
}), 'user');

export {IUser, User, formatUser};

