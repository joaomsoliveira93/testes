import { Document, Schema, model} from 'mongoose';

interface IEduExp extends Document
{
    profile: Schema.Types.ObjectId;
    institution: string;
    coursePT: string;
    courseEN: string;
    courseES: string;
    courseFR: string;
    locationPT: string;
    locationEN: string;
    locationFR: string;
    locationES: string;
    detailsPT: string;
    detailsEN: string;
    detailsFR: string;
    detailsES: string;
    webSite:string;
    startedAt: string;
    endedAt: string;
}

function formatEduExp(eduExp: IEduExp): Partial<IEduExp>
{
    return {
        institution:eduExp.institution,
        coursePT:eduExp.coursePT,
        courseEN:eduExp.courseEN,
        courseES:eduExp.courseES,
        courseFR:eduExp.courseFR,
        locationPT:eduExp.locationPT,
        locationEN:eduExp.locationEN,
        locationFR:eduExp.locationFR,
        locationES:eduExp.locationES,
        detailsPT:eduExp.detailsPT,
        detailsEN:eduExp.detailsEN,
        detailsFR:eduExp.detailsFR,
        detailsES:eduExp.detailsES,
        webSite:eduExp.webSite,
        startedAt:eduExp.startedAt,
        endedAt:eduExp.endedAt
    };
}

const EduExp = model<IEduExp>('eduExp', new Schema<IEduExp>({
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    institution: String,
    coursePT: String,
    courseEN: String,
    courseES: String,
    courseFR: String,
    locationPT: String,
    locationEN: String,
    locationFR: String,
    locationES: String,
    detailsPT: String,
    detailsEN: String,
    detailsFR: String,
    detailsES: String,
    webSite: String,
    startedAt: String,
    endedAt: String
}), 'eduExp')

export {IEduExp, EduExp, formatEduExp};
