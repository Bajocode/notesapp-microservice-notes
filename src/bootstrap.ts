import { constructMongoContext } from './mongo';
import { constructServer } from './server';
import { constructLogger } from './logger';
import Config from './Config';

export const bootstrap = async () => {
  const config = new Config();
  const logger = constructLogger(config);

  try {
    const context = await constructMongoContext(config, logger);
    const server = await constructServer(config, logger, context);

    await server.start();
    logger.info(`Server started: ${server.info.uri}/documentation`);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
