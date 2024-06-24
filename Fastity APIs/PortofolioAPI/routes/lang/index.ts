import { addLang, deleteLang, getLang, getLangProfile, updateLang } from 'controllers/lang';
import { returnError, returnSuccess } from 'shared/utils';
import { langResponses } from 'shared/responses';
import { FastifyPluginAsync } from 'fastify';
import { z as schemaType } from 'zod';
import { ILang } from 'models/lang';

const route: FastifyPluginAsync = async (fastify) => {
  const LangBodySchema = schemaType.object({
    profile: schemaType.string(),
    namePT: schemaType.string(),
    nameEN: schemaType.string(),
    nameES: schemaType.string(),
    nameFR: schemaType.string(),
    oralUnd: schemaType.string(),
    readUnd: schemaType.string(),
    oralPrd: schemaType.string(),
    oralInt: schemaType.string(),
    write:schemaType.string(),
  });

  const LangParamsSchema = schemaType.object({
    id: schemaType.string(),
  });

  type LangParams = schemaType.infer<typeof LangParamsSchema>;

  const LangTag = 'Language';

  fastify.route<{ Params:LangParams }>({
    method: 'GET',
    url: '/getLang/:id',
    schema: {
      tags: [LangTag],
      security: [{ accessToken: [] }],
      params: LangParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Lang = await getLang(fastify, request.params.id);
        returnSuccess(langResponses[2000], response, Lang);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  
  fastify.route<{ Params:LangParams }>({
    method: 'GET',
    url: '/getLangProfile/:id',
    schema: {
      tags: [LangTag],
      security: [{ accessToken: [] }],
      params: LangParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const Lang = await getLangProfile(fastify, request.params.id);
        returnSuccess(langResponses[2000], response, Lang);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{Body: ILang}>({
    method: 'POST',
    url: '/addLang',
    schema:
    {
        tags: [LangTag],
        security: [{accessToken: []}],
        body: LangBodySchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) =>
    {
        try
        {
            await addLang(fastify, request.body);

            returnSuccess(langResponses[2001], response);
        }
        catch (error: any)
        {
            returnError(error, response);
        }
    }
});

fastify.route<{Params:LangParams,Body: ILang}>({
  method: 'PUT',
  url: '/updateLang/:id',
  schema:
  {
      tags: [LangTag],
      security: [{accessToken: []}],
      params: LangParamsSchema,
      body: LangBodySchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await updateLang(fastify,request.params.id, request.body);

          returnSuccess(langResponses[2002], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

fastify.route<{Params:LangParams,Body: ILang}>({
  method: 'DELETE',
  url: '/deleteLang/:id',
  schema:
  {
      tags: [LangTag],
      security: [{accessToken: []}],
      params: LangParamsSchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await deleteLang(fastify,request.params.id);

          returnSuccess(langResponses[2003], response);
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
