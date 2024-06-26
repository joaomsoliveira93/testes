import { Document, Schema, model} from 'mongoose';

interface IOther extends Document
{
    profile: Schema.Types.ObjectId;
    institution: string;
    titlePT: string;
    titleEN: string;
    titleES: string;
    titleFR: string;
    locationPT: string;
    locationEN: string;
    locationFR: string;
    locationES: string;
    detailsPT: string;
    detailsEN: string;
    detailsFR: string;
    detailsES: string;
    webSite:string;
    active:boolean;
    startedAt: string;
    endedAt: string;
}

function formatOther(other: IOther): Partial<IOther>
{
    return {
        institution:other.institution,
        titlePT:other.titlePT,
        titleEN:other.titleEN,
        titleES:other.titleES,
        titleFR:other.titleFR,
        locationPT:other.locationPT,
        locationEN:other.locationEN,
        locationFR:other.locationFR,
        locationES:other.locationES,
        detailsPT:other.detailsPT,
        detailsEN:other.detailsEN,
        detailsFR:other.detailsFR,
        detailsES:other.detailsES,
        webSite:other.webSite,
        active:other.active,
        startedAt:other.startedAt,
        endedAt:other.endedAt
    };
}

const Other = model<IOther>('other', new Schema<IOther>({
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    institution: String,
    titlePT: String,
    titleEN: String,
    titleES: String,
    titleFR: String,
    locationPT: String,
    locationEN: String,
    locationFR: String,
    locationES: String,
    detailsPT: String,
    detailsEN: String,
    detailsFR: String,
    detailsES: String,
    webSite: String,
    active:Boolean,
    startedAt: String,
    endedAt: String
}), 'other')

export {IOther, Other, formatOther};
