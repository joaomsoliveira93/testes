import { Document, Schema, model} from 'mongoose';

interface IProject extends Document
{
    profile: Schema.Types.ObjectId;
    institution: string;
    titlePT: string;
    titleEN: string;
    titleES: string;
    titleFR: string;
    detailsPT: string;
    detailsEN: string;
    detailsFR: string;
    detailsES: string;
    tecnologies:string;
    imgs:string[];
    url:string;
    active:boolean;
}

interface ISimpleProject extends Document
{
    profile: Schema.Types.ObjectId;
    institution: string;
    titlePT: string;
    titleEN: string;
    titleES: string;
    titleFR: string;
    tecnologies:string;
    url:string;
    active:boolean;
}

function formatProject(project: IProject): Partial<IProject>
{
    return {
        institution:project.institution,
        titlePT:project.titlePT,
        titleEN:project.titleEN,
        titleES:project.titleES,
        titleFR:project.titleFR,
        detailsPT:project.detailsPT,
        detailsEN:project.detailsEN,
        detailsFR:project.detailsFR,
        detailsES:project.detailsES,
        tecnologies:project.tecnologies,
        imgs:project.imgs,
        url:project.url,
        active:project.active,
    };
}

function formatSimpleProject(project: ISimpleProject): Partial<ISimpleProject>
{
    return {
        institution:project.institution,
        titlePT:project.titlePT,
        titleEN:project.titleEN,
        titleES:project.titleES,
        titleFR:project.titleFR,
        tecnologies:project.tecnologies,
        url:project.url,
        active:project.active,
    };
}

const Project = model<IProject>('project', new Schema<IProject>({
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    institution: String,
    titlePT: String,
    titleEN: String,
    titleES: String,
    titleFR: String,
    detailsPT: String,
    detailsEN: String,
    detailsFR: String,
    detailsES: String,
    tecnologies:String,
    imgs:[String],
    url: String,
    active:Boolean,
}), 'project')

export {IProject, ISimpleProject, Project, formatProject, formatSimpleProject};
