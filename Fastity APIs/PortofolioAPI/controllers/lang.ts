import { CustomError } from 'shared/custom-error';
import { langResponses } from 'shared/responses';
import { ILang, Lang, formatLang } from '../models/lang';
import { FastifyInstance } from 'fastify/types/instance';

export async function getLang(fastify: FastifyInstance, id: string) {
  const lang: ILang | null = await Lang.findOne({ _id: id });

  if (!lang) {
    throw new CustomError(langResponses[4001]);
  }

  const formatedLang = formatLang(lang);

  return formatedLang;
}

export async function getLangProfile(fastify: FastifyInstance, id: string) {
  const lang: ILang | null = await Lang.findOne({ profile: id });

  if (!lang) {
    throw new CustomError(langResponses[4001]);
  }

  const formatedLang = formatLang(lang);

  return formatedLang;
}

export async function addLang(fastify: FastifyInstance, lang: ILang) {
  const newLang: ILang = new Lang(lang);

  if (!newLang) {
    throw new CustomError(langResponses[4002]);
  }

  await newLang.save();
}

export async function updateLang(
  fastify: FastifyInstance,
  id: string,
  lang: ILang,
) {
  const updatedLang: ILang | null = await Lang.findOneAndUpdate(
    { _id: id },
    lang,
  );

  if (!updatedLang) {
    throw new CustomError(langResponses[4003]);
  }

  await updatedLang.save();
}

export async function deleteLang(fastify: FastifyInstance, id: string) {
  const deletedLang = await Lang.findOneAndDelete({ _id: id });

  if (!deletedLang) {
    throw new CustomError(langResponses[4004]);
  }
}
