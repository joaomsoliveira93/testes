import { CustomError } from 'shared/custom-error';
import { eduExpResponses } from 'shared/responses';
import { IEduExp, EduExp, formatEduExp } from '../models/eduExp';
import { FastifyInstance } from 'fastify/types/instance';

export async function getEduExp(fastify: FastifyInstance, id: string) {
  const eduExp: IEduExp | null = await EduExp.findOne({ _id: id });

  if (!eduExp) {
    throw new CustomError(eduExpResponses[4001]);
  }

  const formatededuExp = formatEduExp(eduExp);

  return formatededuExp;
}

export async function getEduExpProfile(fastify: FastifyInstance, id: string) {
  const eduExp: IEduExp[] | null = await EduExp.find({ profile: id});

  if (!eduExp) {
    throw new CustomError(eduExpResponses[4001]);
  }

  return eduExp;
}

export async function addEduExp(fastify: FastifyInstance, eduExp: IEduExp) {
  const neweduExp: IEduExp = new EduExp(eduExp);

  if (!neweduExp) {
    throw new CustomError(eduExpResponses[4002]);
  }

  await neweduExp.save();
}

export async function updateEduExp(
  fastify: FastifyInstance,
  id: string,
  eduExp: IEduExp,
) {
  const updatededuExp: IEduExp | null = await EduExp.findOneAndUpdate(
    { _id: id },
    eduExp,
  );

  if (!updatededuExp) {
    throw new CustomError(eduExpResponses[4003]);
  }

  await updatededuExp.save();
}

export async function deleteEduExp(fastify: FastifyInstance, id: string) {
  const deletededuExp = await EduExp.findOneAndDelete({ _id: id });

  if (!deletededuExp) {
    throw new CustomError(eduExpResponses[4004]);
  }
}
