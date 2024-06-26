import { addProfile, deleteProfile, getProfile,getProfiles, updateProfile } from 'controllers/profile';
import { returnError, returnSuccess } from 'shared/utils';
import { profileResponses } from 'shared/responses';
import { FastifyPluginAsync } from 'fastify';
import { z as schemaType } from 'zod';
import { IProfile } from 'models/profile';

const route: FastifyPluginAsync = async (fastify) => {
  const profileBodySchema = schemaType.object({
    name: schemaType.string(),
    address: schemaType.string(),
    nationalityPT: schemaType.string(),
    nationalityEN: schemaType.string(),
    nationalityES: schemaType.string(),
    nationalityFR: schemaType.string(),
    email_1: schemaType.string(),
    email_2: schemaType.string(),
    email_3: schemaType.string(),
    email_4: schemaType.string(),
    phone_1: schemaType.string(),
    phone_2: schemaType.string(),
    phone_3: schemaType.string(),
    phone_4: schemaType.string(),
    linkedIn: schemaType.string(),
    web_1: schemaType.string(),
    web_2: schemaType.string(),
    web_3: schemaType.string(),
    web_4: schemaType.string(),
    web_5: schemaType.string(),
    web_6: schemaType.string(),
    active: schemaType.boolean(),
    img:schemaType.string(),
  });

  const profileParamsSchema = schemaType.object({
    id: schemaType.string(),
  });

  type profileParams = schemaType.infer<typeof profileParamsSchema>;

  const profileTag = 'Profile';

  fastify.route<{ Params:profileParams }>({
    method: 'GET',
    url: '/getProfile/:id',
    schema: {
      tags: [profileTag],
      security: [{ accessToken: [] }],
      params: profileParamsSchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const profile = await getProfile(fastify, request.params.id);
        returnSuccess(profileResponses[2000], response, profile);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{}>({
    method: 'GET',
    url: '/getProfiles',
    schema: {
      tags: [profileTag],
      security: [{ accessToken: [] }]
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) => {
      try {
        const profile = await getProfiles(fastify);
        returnSuccess(profileResponses[2000], response, profile);
      } catch (error: any) {
        returnError(error, response);
      }
    },
  });

  fastify.route<{Body: IProfile}>({
    method: 'POST',
    url: '/addProfile',
    schema:
    {
        tags: [profileTag],
        security: [{accessToken: []}],
        body: profileBodySchema
    },
    preHandler: fastify.authenticate,
    handler: async (request, response) =>
    {
        try
        {
            await addProfile(fastify, request.body);

            returnSuccess(profileResponses[2001], response);
        }
        catch (error: any)
        {
            returnError(error, response);
        }
    }
});

fastify.route<{Params:profileParams,Body: IProfile}>({
  method: 'PUT',
  url: '/updateProfile/:id',
  schema:
  {
      tags: [profileTag],
      security: [{accessToken: []}],
      params: profileParamsSchema,
      body: profileBodySchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await updateProfile(fastify,request.params.id, request.body);

          returnSuccess(profileResponses[2002], response);
      }
      catch (error: any)
      {
          returnError(error, response);
      }
  }
});

fastify.route<{Params:profileParams,Body: IProfile}>({
  method: 'DELETE',
  url: '/deleteProfile/:id',
  schema:
  {
      tags: [profileTag],
      security: [{accessToken: []}],
      params: profileParamsSchema
  },
  preHandler: fastify.authenticate,
  handler: async (request, response) =>
  {
      try
      {
          await deleteProfile(fastify,request.params.id);

          returnSuccess(profileResponses[2003], response);
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
