import { Server, ServerRoute } from 'hapi';
import { toHapiResponse } from '../common/IHttpResponse';
import StatusController from './StatusController';

export default class StatusRouter {
  public constructor(server: Server,
                     controller: StatusController) {
    server.route([
      this.getLiveness(controller),
      this.getReadiness(controller),
    ]);
  }

  public getLiveness(controller: StatusController): ServerRoute {
    return {
      method: 'GET',
      path: '/healthz',
      handler: async (request, h) => {
        const response = await controller.handleGetLiveness();
        return toHapiResponse(response, h);
      },
      options: {
        description: 'GET liveness',
        notes: 'Informs interested interested listeners if a full system restart is needed',
        tags: ['api'],
        plugins: {
          'hapi-swagger': {
            responses: {
              200: { description: 'OK' },
            },
          },
        },
      },
    };
  }

  public getReadiness(controller: StatusController): ServerRoute {
    return {
      method: 'GET',
      path: '/readyz',
      handler: async (request, h) => {
        const response = await controller.handleGetReadiness();
        return toHapiResponse(response, h);
      },
      options: {
        description: 'GET readiness',
        notes: 'Informs interested listeners when it is ready to start accepting traffic',
        tags: ['api'],
        plugins: {
          'hapi-swagger': {
            responses: {
              200: { description: 'OK' },
              500: { description: 'Internal Server Error' },
            },
          },
        },
      },
    };
  }
}
