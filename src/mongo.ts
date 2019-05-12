import mongoose, { Mongoose, ConnectionOptions } from 'mongoose';
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
  const mongoUrl = `${config.MONGO_URL}:${config.MONGO_PORT}/${config.MONGO_DBNAME}`;

  processMongoEvents(mongoose, mongoUrl, logger);
  ensureGracefulShutdown(mongoose, logger);
  connect(mongoose, mongoUrl, config);

  return {
    notes: new NoteRepository(),
  };
};

const processMongoEvents = (mongoose: Mongoose, mongoUrl: string, logger: Logger) => {
  mongoose.connection.on(MongoState.Conntected, () => {
    logger.info(`Mongo connected: ${mongoUrl}`);
  });
  mongoose.connection.on(MongoState.Error, (error) => {
    logger.error(`Mongo connection error: ${error}`);
  });
  mongoose.connection.on(MongoState.Disconnected, () => {
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
    user: config.MONGO_USER,
    pass: config.MONGO_PASSWORD,
    dbName: config.MONGO_DBNAME,
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: 10,
    reconnectInterval: 3000,
  };
  await mongoose.connect(mongoUrl, options)
    .catch((error) => {
      throw error;
    });
};
