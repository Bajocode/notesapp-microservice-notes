import mongoose, { Mongoose, ConnectionOptions, mongo } from 'mongoose';
import NoteRepository from './domain/notes/NoteRepository';
import Config from './Config';
import { Logger } from 'winston';

export enum MongoState {
  Conntected = 'connected',
  Disconnected = 'disconnected',
  Reconnected = 'reconnected',
  Error = 'error',
}

export interface IMongoContext {
  notes: NoteRepository;
}

export const constructMongoContext = async (config: Config,
                                            logger: Logger): Promise<IMongoContext> => {
  mongoose.Promise = global.Promise;
  const mongoUrl = `${config.MONGODB_URL}:${config.MONGODB_PORT}/${config.MONGODB_DATABASE}`;

  processMongoEvents(mongoose, mongoUrl, config, logger);
  ensureGracefulShutdown(mongoose, logger);
  connect(mongoose, mongoUrl, config);

  return {
    notes: new NoteRepository(),
  };
};

const processMongoEvents = (mongoose: Mongoose,
                            mongoUrl: string,
                            config: Config,
                            logger: Logger) => {
  mongoose.connection.on(MongoState.Conntected, () => {
    logger.info(`Mongo connected: ${mongoUrl}`);
  });
  mongoose.connection.on(MongoState.Error, (error) => {
    logger.error(`Mongo connection error: ${error}`);
  });
  mongoose.connection.on(MongoState.Disconnected, () => {
    setTimeout(() => {
      connect(mongoose, mongoUrl, config);
    },         5000);

    logger.info('Mongo disconnected');
  });
  mongoose.connection.on(MongoState.Reconnected, () => {
    logger.info('Mongo reconnected');
  });
};

const ensureGracefulShutdown = (mongoose: Mongoose, logger: Logger) => {
  process.on('SIGINT', () => {
    mongoose.connection.close()
      .then(() => {
        logger.error('Mongo disconnected through app termination');
        process.exit(0);
      });
  });
};

const connect = async (mongoose: Mongoose, mongoUrl: string, config: Config) => {
  const options: ConnectionOptions = {
    user: config.MONGODB_USERNAME,
    pass: config.MONGODB_PASSWORD,
    dbName: config.MONGODB_DATABASE,
    useNewUrlParser: true,
    poolSize: 1,
  };

  await mongoose.connect(mongoUrl, options)
    .catch((error) => {
      throw error;
    });
};
