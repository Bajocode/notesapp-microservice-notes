import { createLogger, format, transports, Logger } from 'winston';
import Config from './Config';

export const constructLogger = (config: Config): Logger => {
  const timeStampFormat = format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  });
  const consoleFormat = format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`,
  );
  const consoleTransport = new transports.Console({
    level: config.LOGGER_LEVEL,
    format: format.combine(
      format.colorize(),
      consoleFormat,
    ),
  });

  return createLogger({
    level: config.LOGGER_LEVEL,
    format: format.combine(
      timeStampFormat,
      format.json(),
    ),
    transports: [
      consoleTransport,
    ],
  });
};
