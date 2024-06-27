import { CustomError } from 'shared/custom-error';
import { projectResponses } from 'shared/responses';
import { IProject, Project, formatProject } from '../models/project';
import { FastifyInstance } from 'fastify/types/instance';

export async function getProject(fastify: FastifyInstance, id: string) {
  const project: IProject | null = await Project.findOne({ _id: id });

  if (!project) {
    throw new CustomError(projectResponses[4001]);
  }

  const formatedProject = formatProject(project);

  return formatedProject;
}

export async function getProjectProfile(fastify: FastifyInstance, id: string) {
  const project: IProject[] | null = await Project.find({ profile: id});

  if (!project) {
    throw new CustomError(projectResponses[4001]);
  }

  return project;
}

export async function addProject(fastify: FastifyInstance, project: IProject) {
  const newProject: IProject = new Project(project);

  if (!newProject) {
    throw new CustomError(projectResponses[4002]);
  }

  await newProject.save();
}

export async function updateProject(
  fastify: FastifyInstance,
  id: string,
  project: IProject,
) {
  const updatedProject: IProject | null = await Project.findOneAndUpdate(
    { _id: id },
    project,
  );

  if (!updatedProject) {
    throw new CustomError(projectResponses[4003]);
  }

  await updatedProject.save();
}

export async function deleteProject(fastify: FastifyInstance, id: string) {
  const deletedProject = await Project.findOneAndDelete({ _id: id });

  if (!deletedProject) {
    throw new CustomError(projectResponses[4004]);
  }
}
