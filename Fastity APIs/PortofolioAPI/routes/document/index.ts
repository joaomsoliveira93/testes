import { addDoc, deleteDoc, getDoc, getDocProfile, updateDoc } from 'controllers/document';
import { returnError, returnSuccess } from 'shared/utils';
import { documentResponses } from 'shared/responses';
import { FastifyPluginAsync } from 'fastify';
import { z as schemaType } from 'zod';
import { IDocument } from 'models/document';

const route: FastifyPluginAsync = async (fastify) => {
  const DocBodySchema = schemaType.object({
    profile: schemaType.string(),
    namePT: schemaType.string(),
    nameEN: schemaType.string(),
    nameES: schemaType.string(),
    nameFR: schemaType.string(),
    binary:schemaType.string(),
    active:schemaType.boolean(),
  });

  const DocParamsSchema = schemaType.object({
    id: schemaType.string(),
  });

  type DocParams = schemaType.infer<typeof DocParamsSchema>;

  const DocTag = 'Documents';

  fastify.route<{ Params:DocParams }>({
    method: 'GET',
    url: '/getDoc/:id',
    schema: {
      tags: [DocTag],
      security: [{ accessToken: [] }],
      params: DocParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Lang = await getDoc(fastify, request.params.id);
        returnSuccess(documentResponses[2000], response, Lang);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  
  fastify.route<{ Params:DocParams }>({
    method: 'GET',
    url: '/getDocProfile/:id',
    schema: {
      tags: [DocTag],
      security: [{ accessToken: [] }],
      params: DocParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Lang = await getDocProfile(fastify, request.params.id);
        returnSuccess(documentResponses[2000], response, Lang);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{Body: IDocument}>({
    method: 'POST',
    url: '/addDoc',
    schema:
    {
        tags: [DocTag],
        security: [{accessToken: []}],
        body: DocBodySchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) =>
    {
        try
        {
            await addDoc(fastify, request.body);

            returnSuccess(documentResponses[2001], response);
        }
        catch (error: any)
        {
            returnError(error, response);
        }
    }
});

fastify.route<{Params:DocParams,Body: IDocument}>({
  method: 'PUT',
  url: '/updateDoc/:id',
  schema:
  {
      tags: [DocTag],
      security: [{accessToken: []}],
      params: DocParamsSchema,
      body: DocBodySchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await updateDoc(fastify,request.params.id, request.body);

          returnSuccess(documentResponses[2002], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

fastify.route<{Params:DocParams,Body: IDocument}>({
  method: 'DELETE',
  url: '/deleteDoc/:id',
  schema:
  {
      tags: [DocTag],
      security: [{accessToken: []}],
      params: DocParamsSchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await deleteDoc(fastify,request.params.id);

          returnSuccess(documentResponses[2003], response);
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
