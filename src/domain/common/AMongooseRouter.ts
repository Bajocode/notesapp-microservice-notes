import { Document } from 'mongoose';
import { ServerRoute } from 'hapi';
import { toHapiResponse } from './IHttpResponse';
import AMongooseController from './AMongooseController';
import ACrudValidator from './ACrudValidator';

export default class AMongooseRouter<T extends Document> {
  protected get(controller: AMongooseController<T>,
                domainName: string): ServerRoute {
    return {
      method: 'GET',
      path: `/${domainName}`,
      handler: async (request, h) => {
        const response = await controller.handleGet();
        return toHapiResponse(response, h);
      },
      options: {
        description: `GET ${domainName.slice(0, -1)}`,
        notes: `Retrieve all ${domainName}`,
        tags: ['api'],
        plugins: {
          'hapi-swagger': {
            responses: {
              200: { description: 'OK' },
              400: { description: 'Bad Request' },
            },
          },
        },
      },
    };
  }

  protected post(controller: AMongooseController<T>,
                 validator: ACrudValidator,
                 domainName: string): ServerRoute {
    return {
      method: 'POST',
      path: `/${domainName}`,
      handler: async (request, h) => {
        const response = await controller.handlePost(request.payload);
        return toHapiResponse(response, h);
      },
      options: {
        validate: { payload: validator.payloadCreateSchema },
        description: `POST ${domainName.slice(0, -1)}`,
        notes: `Create a new ${domainName.slice(0, -1)} with a valid payload`,
        tags: ['api'],
        plugins: {
          'hapi-swagger': {
            responses: {
              201: { description: 'Created' },
              400: { description: 'Bad Request' },
            },
          },
        },
      },
    };
  }

  protected put(controller: AMongooseController<T>,
                validator: ACrudValidator,
                domainName: string): ServerRoute {
    return {
      method: 'PUT',
      path: `/${domainName}/{id}`,
      handler: async (request, h) => {
        const response = await controller.handlePut(request.params.id, request.payload);
        return toHapiResponse(response, h);
      },
      options: {
        validate: {
          payload: validator.payloadUpdateSchema,
          params: { id: validator.paramsObjectIdSchema },
        },
        description: `PUT ${domainName.slice(0, -1)}`,
        notes: `Update a new ${domainName.slice(0, -1)} idempotently with a valid payload and id`,
        tags: ['api'],
        plugins: {
          'hapi-swagger': {
            responses: {
              204: { description: 'No Content' },
              400: { description: 'Bad Request' },
            },
          },
        },
      },
    };
  }

  protected delete(controller: AMongooseController<T>,
                   validator: ACrudValidator,
                   domainName: string): ServerRoute {
    return {
      method: 'DELETE',
      path: `/${domainName}/{id}`,
      handler: async (request, h) => {
        const response = await controller.handleDelete(request.params.id);
        return toHapiResponse(response, h);
      },
      options: {
        validate: {
          params: { id: validator.paramsObjectIdSchema },
        },
        description: `DELETE ${domainName.slice(0, -1)}`,
        notes: `Delete a ${domainName.slice(0, -1)} idempotently with a valid id`,
        tags: ['api'],
        plugins: {
          'hapi-swagger': {
            responses: {
              204: { description: 'No Content' },
              400: { description: 'Bad Request' },
            },
          },
        },
      },
    };
  }
}
