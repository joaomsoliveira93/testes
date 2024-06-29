import { CustomError } from 'shared/custom-error';
import { profileResponses } from 'shared/responses';
import { IProfile, Profile, formatProfile, formatProfileInfos } from '../models/profile';
import { ISimpleProject, formatSimpleProject } from 'models/project';
import { FastifyInstance } from 'fastify/types/instance';
import { IProExp, ProExp } from 'models/proExp';
import { EduExp, IEduExp } from 'models/eduExp';
import { ILang, Lang } from 'models/lang';
import { IOther, Other } from 'models/otherInfo';
import { IProject, Project } from 'models/project';
import { Doc, IDocument } from 'models/document';


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

export async function getProfileInfos(fastify: FastifyInstance, id: string) {
  const profile: IProfile | null = await Profile.findOne({ _id: id });
  const proExp:IProExp [] |null = await ProExp.find({profile:id})
  const eduExp:IEduExp[] |null = await EduExp.find({profile:id})
  const lang:ILang[] |null = await Lang.find({profile:id})
  const otherInfo:IOther[] |null = await Other.find({profile:id})
  const project:ISimpleProject[] | null = await Project.find({profile:id})
  const document:IDocument[] |null = await Doc.find({profile:id})

  if (!profile) {
    throw new CustomError(profileResponses[4001]);
  }

  const formatedProfileInfos = formatProfileInfos(profile,proExp,eduExp,lang,otherInfo,project,document);

  return formatedProfileInfos;
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
