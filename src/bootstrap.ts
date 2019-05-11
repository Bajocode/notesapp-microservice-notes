import { constructMongoContext } from './mongo';
import { constructServer } from './server';

export const bootstrap = async () => {
  try {
    const context = await constructMongoContext();
    const server = await constructServer(context);

    await server.start();
    console.log(`Server started: ${server.info.uri}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
