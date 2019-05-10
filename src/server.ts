import { Server } from 'hapi';

export const constructServer = async (): Promise<Server> => {
  try {
    return createServer();
  } catch (error) {
    throw error;
  }
};

const createServer = (): Server => {
  return new Server({
    port: 3000,
    host: 'localhost',
  });
};
