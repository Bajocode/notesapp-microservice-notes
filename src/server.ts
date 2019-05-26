import { Server } from 'hapi';
import inert from 'inert';
import vision from 'vision';
import hapiSwagger from 'hapi-swagger';
import packageJson from '../package.json';
import { IMongoContext } from './mongo';
import IDomainValidator from './domain/common/IDomainValidator';
import NoteValidator from './domain/notes/NoteValidator';
import notes from './domain/notes';
import statuses from './domain/statuses';
import Config from './Config';
import { Logger } from 'winston';

export const constructServer = async (config: Config,
                                      logger: Logger,
                                      context: IMongoContext): Promise<Server> => {
  try {
    const server = instantiateServer(config);
    await registerComponents(server);
    registerRoutes(server, context);

    return server;
  } catch (error) {
    logger.error(`Error constructing server: ${error}`);
    throw error;
  }
};

const instantiateServer = (config: Config): Server => {
  return new Server({
    address: config.SERVER_DOMAIN,
    port: config.SERVER_PORT,
  });
};

const registerComponents = async (server: Server): Promise<void> =>  {
  Promise.all([
    server.register([inert, vision]),
    server.register({
      plugin: hapiSwagger,
      options: {
        info: {
          title: packageJson.name,
          version: packageJson.version,
        },
      },
    }),
  ]);
};

const registerRoutes = (server: Server,
                        context: IMongoContext) => {
  const validator: IDomainValidator = {
    notes: new NoteValidator(),
  };

  notes(server, context, validator);
  statuses(server);
};
