import { CustomError } from 'shared/custom-error';
import { proExpResponses } from 'shared/responses';
import { IProExp, ProExp, formatProExp } from '../models/proExp';
import { FastifyInstance } from 'fastify/types/instance';

export async function getProExp(fastify: FastifyInstance, id: string) {
  const proExp: IProExp | null = await ProExp.findOne({ _id: id });

  if (!proExp) {
    throw new CustomError(proExpResponses[4001]);
  }

  const formatedProExp = formatProExp(proExp);

  return formatedProExp;
}

export async function getProExpProfile(fastify: FastifyInstance, id: string) {
  const proExp: IProExp | null = await ProExp.findOne({ profile: id });

  if (!proExp) {
    throw new CustomError(proExpResponses[4001]);
  }

  const formatedProExp = formatProExp(proExp);

  return formatedProExp;
}

export async function addProExp(fastify: FastifyInstance, proExp: IProExp) {
  const newProExp: IProExp = new ProExp(proExp);

  if (!newProExp) {
    throw new CustomError(proExpResponses[4002]);
  }

  await newProExp.save();
}

export async function updateProExp(
  fastify: FastifyInstance,
  id: string,
  proExp: IProExp,
) {
  const updatedProExp: IProExp | null = await ProExp.findOneAndUpdate(
    { _id: id },
    proExp,
  );

  if (!updatedProExp) {
    throw new CustomError(proExpResponses[4003]);
  }

  await updatedProExp.save();
}

export async function deleteProExp(fastify: FastifyInstance, id: string) {
  const deletedProExp = await ProExp.findOneAndDelete({ _id: id });

  if (!deletedProExp) {
    throw new CustomError(proExpResponses[4004]);
  }
}
