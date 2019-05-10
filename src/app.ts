import { constructServer } from './server';

export const constructApp = async () => {
  try {
    const server = await constructServer();
    await server.start();
    console.log(`Server started: ${server.info.uri}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
