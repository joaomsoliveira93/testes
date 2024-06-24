import { Document, Schema, model} from 'mongoose';

interface ILang extends Document
{
    profile: Schema.Types.ObjectId;
    namePT: string;
    nameEN: string;
    nameES: string;
    nameFR: string;
    oralUnd: string;
    readUnd: string;
    oralPrd: string;
    oralInt: string;
    write:string;
}

function formatLang(lang: ILang): Partial<ILang>
{
    return {
        namePT:lang.namePT,
        nameEN:lang.nameEN,
        nameES:lang.nameES,
        nameFR:lang.nameFR,
        oralUnd:lang.oralUnd,
        readUnd:lang.readUnd,
        oralPrd:lang.oralPrd,
        oralInt:lang.oralInt
    };
}

const Lang = model<ILang>('lang', new Schema<ILang>({
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
    namePT: String,
    nameEN: String,
    nameES: String,
    nameFR: String,
    oralUnd: String,
    readUnd: String,
    oralPrd: String,
    oralInt: String
}), 'lang')

export {ILang, Lang, formatLang};
