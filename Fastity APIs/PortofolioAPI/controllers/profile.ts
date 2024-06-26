import { CustomError } from 'shared/custom-error';
import { profileResponses } from 'shared/responses';
import { IProfile, Profile, formatProfile } from '../models/profile';
import { FastifyInstance } from 'fastify/types/instance';


export async function getProfiles(fastify: FastifyInstance) {
  const profile: IProfile[] | null = await Profile.find({active:true});

  if (!profile) {
    throw new CustomError(profileResponses[4001]);
  }

  return profile;
}

export async function getProfile(fastify: FastifyInstance, id: string) {
  const profile: IProfile | null = await Profile.findOne({ _id: id });

  if (!profile) {
    throw new CustomError(profileResponses[4001]);
  }

  const formatedProfile = formatProfile(profile);

  return formatedProfile;
}

export async function addProfile(fastify: FastifyInstance, profile: IProfile) {
  const newProfile: IProfile = new Profile(profile);

  if (!newProfile) {
    throw new CustomError(profileResponses[4002]);
  }

  await newProfile.save();
}

export async function updateProfile(
  fastify: FastifyInstance,
  id: string,
  profile: IProfile,
) {
  const updatedProfile: IProfile | null = await Profile.findOneAndUpdate(
    { _id: id },
    profile,
  );

  if (!updatedProfile) {
    throw new CustomError(profileResponses[4003]);
  }

  await updatedProfile.save();
}

export async function deleteProfile(fastify: FastifyInstance, id: string) {
  const deletedProfile = await Profile.findOneAndDelete({ _id: id });

  if (!deletedProfile) {
    throw new CustomError(profileResponses[4004]);
  }
}
