import mongoose, { Mongoose } from 'mongoose';
import NoteRepository from './domain/notes/NoteRepository';

export enum MongoState {
  Conntected = 'connected',
  Disconnected = 'disconnected',
  Reconnected = 'reconnected',
  Error = 'error',
}

export interface IMongoContext {
  notes: NoteRepository;
}

export const constructMongoContext = async (): Promise<IMongoContext> => {
  mongoose.Promise = global.Promise;

  const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/notes';

  processMongoEvents(mongoose, mongoUrl);
  ensureGracefulShutdown(mongoose);
  connect(mongoose, mongoUrl);

  return {
    notes: new NoteRepository(),
  };
};

const processMongoEvents = (mongoose: Mongoose, mongoUrl: string) => {
  mongoose.connection.on(MongoState.Conntected, () => {
    console.log(`Mongo connected: ${mongoUrl}`);
  });
  mongoose.connection.on(MongoState.Error, (error) => {
    console.log(`Mongo connection error: ${error}`);
  });
  mongoose.connection.on(MongoState.Disconnected, () => {
    console.log('Mongo disconnected');
  });
  mongoose.connection.on(MongoState.Reconnected, () => {
    console.log('Mongo reconnected');
  });
};

const ensureGracefulShutdown = (mongoose: Mongoose) => {
  process.on('SIGINT', () => {
    mongoose.connection.close()
      .then(() => {
        console.log('Mongo disconnected through app termination');
        process.exit(0);
      });
  });
};

const connect = async (mongoose: Mongoose, mongoUrl: string) => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: 10,
    reconnectInterval: 3000,
  }).catch((error) => {
    throw error;
  });
};
