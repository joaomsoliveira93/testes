import { addProExp, deleteProExp, getProExp, getProExpProfile, updateProExp } from 'controllers/proExp';
import { returnError, returnSuccess } from 'shared/utils';
import { proExpResponses } from 'shared/responses';
import { FastifyPluginAsync } from 'fastify';
import { z as schemaType } from 'zod';
import { IProExp } from 'models/proExp';

const route: FastifyPluginAsync = async (fastify) => {
  const ProExpBodySchema = schemaType.object({
    profile: schemaType.string(),
    company: schemaType.string(),
    jobTitlePT: schemaType.string(),
    jobTitleEN: schemaType.string(),
    jobTitleES: schemaType.string(),
    jobTitleFR: schemaType.string(),
    locationPT: schemaType.string(),
    locationEN: schemaType.string(),
    locationFR: schemaType.string(),
    locationES: schemaType.string(),
    detailsPT: schemaType.string(),
    detailsEN: schemaType.string(),
    detailsFR: schemaType.string(),
    detailsES: schemaType.string(),
    startedAt: schemaType.string(),
    endedAt: schemaType.string(),
  });

  const ProExpParamsSchema = schemaType.object({
    id: schemaType.string(),
  });

  type ProExpParams = schemaType.infer<typeof ProExpParamsSchema>;

  const ProExpTag = 'Professional Experience';

  fastify.route<{ Params:ProExpParams }>({
    method: 'GET',
    url: '/getProExp/:id',
    schema: {
      tags: [ProExpTag],
      security: [{ accessToken: [] }],
      params: ProExpParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const ProExp = await getProExp(fastify, request.params.id);
        returnSuccess(proExpResponses[2000], response, ProExp);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  
  fastify.route<{ Params:ProExpParams }>({
    method: 'GET',
    url: '/getProExpProfile/:id',
    schema: {
      tags: [ProExpTag],
      security: [{ accessToken: [] }],
      params: ProExpParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const ProExp = await getProExpProfile(fastify, request.params.id);
        returnSuccess(proExpResponses[2000], response, ProExp);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{Body: IProExp}>({
    method: 'POST',
    url: '/addProExp',
    schema:
    {
        tags: [ProExpTag],
        security: [{accessToken: []}],
        body: ProExpBodySchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) =>
    {
        try
        {
            await addProExp(fastify, request.body);

            returnSuccess(proExpResponses[2001], response);
        }
        catch (error: any)
        {
            returnError(error, response);
        }
    }
});

fastify.route<{Params:ProExpParams,Body: IProExp}>({
  method: 'PUT',
  url: '/updateProExp/:id',
  schema:
  {
      tags: [ProExpTag],
      security: [{accessToken: []}],
      params: ProExpParamsSchema,
      body: ProExpBodySchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await updateProExp(fastify,request.params.id, request.body);

          returnSuccess(proExpResponses[2002], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

fastify.route<{Params:ProExpParams,Body: IProExp}>({
  method: 'DELETE',
  url: '/deleteProExp/:id',
  schema:
  {
      tags: [ProExpTag],
      security: [{accessToken: []}],
      params: ProExpParamsSchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await deleteProExp(fastify,request.params.id);

          returnSuccess(proExpResponses[2003], response);
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
