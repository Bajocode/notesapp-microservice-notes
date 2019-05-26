import { Document } from 'mongoose';
import { ServerRoute } from 'hapi';
import { toHapiResponse } from './IHttpResponse';
import AMongooseController from './AMongooseController';
import ACrudValidator from './ACrudValidator';

export default class AMongooseRouter<T extends Document> {
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
}
