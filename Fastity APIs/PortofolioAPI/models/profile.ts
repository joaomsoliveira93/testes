import {Document, Schema, model} from 'mongoose';

interface IProfile extends Document
{
    name?: string;
    address?: string;
    nationalityPT?: string;
    nationalityEN?: string;
    nationalityES?: string;
    nationalityFR?: string;
    email_1?: string;
    email_2?: string;
    email_3?: string;
    email_4?: string;
    phone_1?: string;
    phone_2?: string;
    phone_3?: string;
    phone_4?: string;
    linkedIn?: string;
    web_1?: string;
    web_2?: string;
    web_3?: string;
    web_4?: string;
    web_5?: string;
    web_6?: string;
    img?:string;
}

function formatProfile(profile: IProfile): Partial<IProfile>
{
    return {
        id: profile._id,
        name:profile.name,
        address:profile.address,
        nationalityPT:profile.nationalityPT,
        nationalityEN:profile.nationalityEN,
        nationalityES:profile.nationalityES,
        nationalityFR:profile.nationalityFR,
        email_1:profile.email_1,
        email_2:profile.email_2,
        email_3:profile.email_3,
        email_4:profile.email_4,
        phone_1:profile.phone_1,
        phone_2:profile.phone_2,
        phone_3:profile.phone_3,
        phone_4:profile.phone_4,
        linkedIn:profile.linkedIn,
        web_1:profile.web_1,
        web_2:profile.web_2,
        web_3:profile.web_3,
        web_4:profile.web_4,
        web_5:profile.web_5,
        web_6:profile.web_6,
        img:profile.img
    };
}

const Profile = model<IProfile>('Profile', new Schema<IProfile>({
    name: String,
    address: String,
    nationalityPT: String,
    nationalityEN: String,
    nationalityES: String,
    nationalityFR: String,
    email_1: String,
    email_2: String,
    email_3: String,
    email_4: String,
    phone_1: String,
    phone_2: String,
    phone_3: String,
    phone_4: String,
    linkedIn: String,
    web_1: String,
    web_2: String,
    web_3: String,
    web_4: String,
    web_5: String,
    web_6: String,
    img:String
}), 'profile');

export {IProfile, Profile, formatProfile};
