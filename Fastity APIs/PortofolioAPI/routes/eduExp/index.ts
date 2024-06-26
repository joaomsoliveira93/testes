import { addEduExp, deleteEduExp, getEduExp, getEduExpProfile, updateEduExp } from 'controllers/eduExp';
import { returnError, returnSuccess } from 'shared/utils';
import { eduExpResponses } from 'shared/responses';
import { FastifyPluginAsync } from 'fastify';
import { z as schemaType } from 'zod';
import { IEduExp } from 'models/eduExp';

const route: FastifyPluginAsync = async (fastify) => {
  const EduExpBodySchema = schemaType.object({
    profile: schemaType.string(),
    institution: schemaType.string(),
    coursePT: schemaType.string(),
    courseEN: schemaType.string(),
    courseES: schemaType.string(),
    courseFR: schemaType.string(),
    locationPT: schemaType.string(),
    locationEN: schemaType.string(),
    locationFR: schemaType.string(),
    locationES: schemaType.string(),
    detailsPT: schemaType.string(),
    detailsEN: schemaType.string(),
    detailsFR: schemaType.string(),
    detailsES: schemaType.string(),
    webSite: schemaType.string(),
    active: schemaType.boolean(),
    startedAt: schemaType.string(),
    endedAt: schemaType.string(),
  });

  const EduExpParamsSchema = schemaType.object({
    id: schemaType.string(),
  });

  type EduExpParams = schemaType.infer<typeof EduExpParamsSchema>;

  const EduExpTag = 'Education Experience';

  fastify.route<{ Params:EduExpParams }>({
    method: 'GET',
    url: '/getEduExp/:id',
    schema: {
      tags: [EduExpTag],
      security: [{ accessToken: [] }],
      params: EduExpParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const EduExp = await getEduExp(fastify, request.params.id);
        returnSuccess(eduExpResponses[2000], response, EduExp);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  
  fastify.route<{ Params:EduExpParams }>({
    method: 'GET',
    url: '/getEduExpProfile/:id',
    schema: {
      tags: [EduExpTag],
      security: [{ accessToken: [] }],
      params: EduExpParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const EduExp = await getEduExpProfile(fastify, request.params.id);
        returnSuccess(eduExpResponses[2000], response, EduExp);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{Body: IEduExp}>({
    method: 'POST',
    url: '/addEduExp',
    schema:
    {
        tags: [EduExpTag],
        security: [{accessToken: []}],
        body: EduExpBodySchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) =>
    {
        try
        {
            await addEduExp(fastify, request.body);

            returnSuccess(eduExpResponses[2001], response);
        }
        catch (error: any)
        {
            returnError(error, response);
        }
    }
});

fastify.route<{Params:EduExpParams,Body: IEduExp}>({
  method: 'PUT',
  url: '/updateEduExp/:id',
  schema:
  {
      tags: [EduExpTag],
      security: [{accessToken: []}],
      params: EduExpParamsSchema,
      body: EduExpBodySchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await updateEduExp(fastify,request.params.id, request.body);

          returnSuccess(eduExpResponses[2002], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

fastify.route<{Params:EduExpParams,Body: IEduExp}>({
  method: 'DELETE',
  url: '/deleteEduExp/:id',
  schema:
  {
      tags: [EduExpTag],
      security: [{accessToken: []}],
      params: EduExpParamsSchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await deleteEduExp(fastify,request.params.id);

          returnSuccess(eduExpResponses[2003], response);
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
