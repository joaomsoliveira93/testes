import { Document, Schema, model} from 'mongoose';

interface IProExp extends Document
{
    profile: Schema.Types.ObjectId;
    company: string;
    jobTitlePT: string;
    jobTitleEN: string;
    jobTitleES: string;
    jobTitleFR: string;
    locationPT: string;
    locationEN: string;
    locationFR: string;
    locationES: string;
    detailsPT: string;
    detailsEN: string;
    detailsFR: string;
    detailsES: string;
    startedAt: string;
    endedAt: string;
}

function formatProExp(proExp: IProExp): Partial<IProExp>
{
    return {
        company:proExp.company,
        jobTitlePT:proExp.jobTitlePT,
        jobTitleEN:proExp.jobTitleEN,
        jobTitleES:proExp.jobTitleES,
        jobTitleFR:proExp.jobTitleFR,
        locationPT:proExp.locationPT,
        locationEN:proExp.locationEN,
        locationFR:proExp.locationFR,
        locationES:proExp.locationES,
        detailsPT:proExp.detailsPT,
        detailsEN:proExp.detailsEN,
        detailsFR:proExp.detailsFR,
        detailsES:proExp.detailsES,
        startedAt:proExp.startedAt,
        endedAt:proExp.endedAt
    };
}

const ProExp = model<IProExp>('proExp', new Schema<IProExp>({
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    company: String,
    jobTitlePT: String,
    jobTitleEN: String,
    jobTitleES: String,
    jobTitleFR: String,
    locationPT: String,
    locationEN: String,
    locationFR: String,
    locationES: String,
    detailsPT: String,
    detailsEN: String,
    detailsFR: String,
    detailsES: String,
    startedAt: String,
    endedAt: String
}), 'proExp')

export {IProExp, ProExp, formatProExp};
