import { addProject, deleteProject, getProject, getProjectProfile, updateProject } from 'controllers/project';
import { returnError, returnSuccess } from 'shared/utils';
import { projectResponses } from 'shared/responses';
import { FastifyPluginAsync } from 'fastify';
import { z as schemaType } from 'zod';
import { IProject } from 'models/project';

const route: FastifyPluginAsync = async (fastify) => {
  const ProjectBodySchema = schemaType.object({
    profile: schemaType.string(),
    institution: schemaType.string(),
    titlePT: schemaType.string(),
    titleEN: schemaType.string(),
    titleES: schemaType.string(),
    titleFR: schemaType.string(),
    detailsPT: schemaType.string(),
    detailsEN: schemaType.string(),
    detailsFR: schemaType.string(),
    detailsES: schemaType.string(),
    tecnologies:schemaType.string(),
    imgs: schemaType.string().array(),
    url: schemaType.string(),
    active: schemaType.boolean(),
  });

  const ProjectParamsSchema = schemaType.object({
    id: schemaType.string(),
  });

  type ProjectParams = schemaType.infer<typeof ProjectParamsSchema>;

  const ProjectTag = 'Projects';

  fastify.route<{ Params:ProjectParams }>({
    method: 'GET',
    url: '/getProject/:id',
    schema: {
      tags: [ProjectTag],
      security: [{ accessToken: [] }],
      params: ProjectParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Project = await getProject(fastify, request.params.id);
        returnSuccess(projectResponses[2000], response, Project);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  
  fastify.route<{ Params:ProjectParams }>({
    method: 'GET',
    url: '/getProjectProfile/:id',
    schema: {
      tags: [ProjectTag],
      security: [{ accessToken: [] }],
      params: ProjectParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Project = await getProjectProfile(fastify, request.params.id);
        returnSuccess(projectResponses[2000], response, Project);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{Body: IProject}>({
    method: 'POST',
    url: '/addProject',
    schema:
    {
        tags: [ProjectTag],
        security: [{accessToken: []}],
        body: ProjectBodySchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) =>
    {
        try
        {
            await addProject(fastify, request.body);

            returnSuccess(projectResponses[2001], response);
        }
        catch (error: any)
        {
            returnError(error, response);
        }
    }
});

fastify.route<{Params:ProjectParams,Body: IProject}>({
  method: 'PUT',
  url: '/updateProject/:id',
  schema:
  {
      tags: [ProjectTag],
      security: [{accessToken: []}],
      params: ProjectParamsSchema,
      body: ProjectBodySchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await updateProject(fastify,request.params.id, request.body);

          returnSuccess(projectResponses[2002], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

fastify.route<{Params:ProjectParams,Body: IProject}>({
  method: 'DELETE',
  url: '/deleteProject/:id',
  schema:
  {
      tags: [ProjectTag],
      security: [{accessToken: []}],
      params: ProjectParamsSchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await deleteProject(fastify,request.params.id);

          returnSuccess(projectResponses[2003], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

  return Promise.resolve();
};

export default route;
