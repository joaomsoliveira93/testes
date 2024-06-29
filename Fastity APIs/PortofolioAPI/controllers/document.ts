import { CustomError } from 'shared/custom-error';
import { documentResponses } from 'shared/responses';
import { FastifyInstance } from 'fastify/types/instance';
import { IDocument,Doc, formatDocument } from 'models/document';

export async function getDoc(fastify: FastifyInstance, id: string) {
  const doc: IDocument | null = await Doc.findOne({ _id: id });

  if (!doc) {
    throw new CustomError(documentResponses[4001]);
  }

  const formatedDoc = formatDocument(doc);

  return formatedDoc;
}

export async function getDocProfile(fastify: FastifyInstance, id: string) {
  const doc: IDocument[] | null = await Doc.find({ profile: id });

  if (!doc) {
    throw new CustomError(documentResponses[4001]);
  }

  return doc;
}

export async function addDoc(fastify: FastifyInstance, doc: IDocument) {
  const newdoc: IDocument = new Doc(doc);

  if (!newdoc) {
    throw new CustomError(documentResponses[4002]);
  }

  await newdoc.save();
}

export async function updateDoc(
  fastify: FastifyInstance,
  id: string,
  doc: IDocument,
) {
  const updatedDoc: IDocument | null = await Doc.findOneAndUpdate(
    { _id: id },
    doc,
  );

  if (!updatedDoc) {
    throw new CustomError(documentResponses[4003]);
  }

  await updatedDoc.save();
}

export async function deleteDoc(fastify: FastifyInstance, id: string) {
  const deleteddoc = await Doc.findOneAndDelete({ _id: id });

  if (!deleteddoc) {
    throw new CustomError(documentResponses[4004]);
  }
}
