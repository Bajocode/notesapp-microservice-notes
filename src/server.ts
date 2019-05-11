import { Server } from 'hapi';
import inert from 'inert';
import vision from 'vision';
import hapiSwagger from 'hapi-swagger';
import packageJson from '../package.json';
import { IMongoContext } from './mongo';
import IDomainValidator from './domain/common/IDomainValidator';
import NoteValidator from './domain/notes/NoteValidator';
import notes from './domain/notes';

export const constructServer = async (context: IMongoContext): Promise<Server> => {
  try {
    const server = instantiateServer();
    await registerComponents(server, context);
    registerRoutes(server, context);

    return server;
  } catch (error) {
    console.log(`Error constructing server: ${error}`);
    throw error;
  }
};

const instantiateServer = (): Server => {
  return new Server({
    port: 3000,
    host: 'localhost',
    debug: { request: ['error'] },
  });
};

const registerComponents = async (server: Server,
                                  context: IMongoContext): Promise<void> =>  {
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
};
