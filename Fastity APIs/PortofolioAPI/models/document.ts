import { Document, Schema, model } from 'mongoose';

interface IDocument extends Document {
  profile: Schema.Types.ObjectId;
  namePT: string;
  nameEN: string;
  nameES: string;
  nameFR: string;
  binary: string;
  active: boolean;
}

function formatDocument(doc: IDocument): Partial<IDocument> {
  return {
    namePT: doc.namePT,
    nameEN: doc.nameEN,
    nameES: doc.nameES,
    nameFR: doc.nameFR,
    binary: doc.binary,
    active: doc.active,
  };
}

const Doc = model<IDocument>(
  'document',
  new Schema<IDocument>({
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
    namePT: String,
    nameEN: String,
    nameES: String,
    nameFR: String,
    binary: String,
    active: Boolean,
  }),
  'document',
);

export { IDocument, Doc, formatDocument };

