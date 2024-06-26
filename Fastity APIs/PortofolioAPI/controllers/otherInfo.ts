import { CustomError } from 'shared/custom-error';
import { otherResponses } from 'shared/responses';
import { IOther, Other, formatOther } from '../models/otherInfo';
import { FastifyInstance } from 'fastify/types/instance';

export async function getOther(fastify: FastifyInstance, id: string) {
  const other: IOther | null = await Other.findOne({ _id: id });

  if (!other) {
    throw new CustomError(otherResponses[4001]);
  }

  const formatedother = formatOther(other);

  return formatedother;
}

export async function getOtherProfile(fastify: FastifyInstance, id: string) {
  const other: IOther[] | null = await Other.find({ profile: id, active:true });

  if (!other) {
    throw new CustomError(otherResponses[4001]);
  }

  return other;
}

export async function addOther(fastify: FastifyInstance, other: IOther) {
  const newother: IOther = new Other(other);

  if (!newother) {
    throw new CustomError(otherResponses[4002]);
  }

  await newother.save();
}

export async function updateOther(
  fastify: FastifyInstance,
  id: string,
  other: IOther,
) {
  const updatedother: IOther | null = await Other.findOneAndUpdate(
    { _id: id },
    other,
  );

  if (!updatedother) {
    throw new CustomError(otherResponses[4003]);
  }

  await updatedother.save();
}

export async function deleteOther(fastify: FastifyInstance, id: string) {
  const deletedother = await Other.findOneAndDelete({ _id: id });

  if (!deletedother) {
    throw new CustomError(otherResponses[4004]);
  }
}
