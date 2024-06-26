import { addOther, deleteOther, getOther, getOtherProfile, updateOther } from 'controllers/otherInfo';
import { returnError, returnSuccess } from 'shared/utils';
import { otherResponses } from 'shared/responses';
import { FastifyPluginAsync } from 'fastify';
import { z as schemaType } from 'zod';
import { IOther } from 'models/otherInfo';

const route: FastifyPluginAsync = async (fastify) => {
  const OtherBodySchema = schemaType.object({
    profile: schemaType.string(),
    institution: schemaType.string(),
    titlePT: schemaType.string(),
    titleEN: schemaType.string(),
    titleES: schemaType.string(),
    titleFR: schemaType.string(),
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

  const OtherParamsSchema = schemaType.object({
    id: schemaType.string(),
  });

  type OtherParams = schemaType.infer<typeof OtherParamsSchema>;

  const OtherTag = 'Aditional Information';

  fastify.route<{ Params:OtherParams }>({
    method: 'GET',
    url: '/getOther/:id',
    schema: {
      tags: [OtherTag],
      security: [{ accessToken: [] }],
      params: OtherParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Other = await getOther(fastify, request.params.id);
        returnSuccess(otherResponses[2000], response, Other);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  
  fastify.route<{ Params:OtherParams }>({
    method: 'GET',
    url: '/getOtherProfile/:id',
    schema: {
      tags: [OtherTag],
      security: [{ accessToken: [] }],
      params: OtherParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Other = await getOtherProfile(fastify, request.params.id);
        returnSuccess(otherResponses[2000], response, Other);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{Body: IOther}>({
    method: 'POST',
    url: '/addOther',
    schema:
    {
        tags: [OtherTag],
        security: [{accessToken: []}],
        body: OtherBodySchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) =>
    {
        try
        {
            await addOther(fastify, request.body);

            returnSuccess(otherResponses[2001], response);
        }
        catch (error: any)
        {
            returnError(error, response);
        }
    }
});

fastify.route<{Params:OtherParams,Body: IOther}>({
  method: 'PUT',
  url: '/updateOther/:id',
  schema:
  {
      tags: [OtherTag],
      security: [{accessToken: []}],
      params: OtherParamsSchema,
      body: OtherBodySchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await updateOther(fastify,request.params.id, request.body);

          returnSuccess(otherResponses[2002], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

fastify.route<{Params:OtherParams,Body: IOther}>({
  method: 'DELETE',
  url: '/deleteOther/:id',
  schema:
  {
      tags: [OtherTag],
      security: [{accessToken: []}],
      params: OtherParamsSchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await deleteOther(fastify,request.params.id);

          returnSuccess(otherResponses[2003], response);
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
