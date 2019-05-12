import joi, { ObjectSchema } from 'joi';

export default class Config {
  public readonly NODE_ENV: string;
  public readonly LOGGER_LEVEL: string;
  public readonly LOGGER_ENABLED: boolean;
  public readonly SERVER_DOMAIN: string;
  public readonly SERVER_PORT: number;
  public readonly MONGO_URL: string;
  public readonly MONGO_PORT: number;
  public readonly MONGO_DBNAME: string;
  public readonly MONGO_USER: string;
  public readonly MONGO_PASSWORD: string;

  public constructor() {
    const { error, value: envVars } = joi.validate(process.env, this.envVarsSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.NODE_ENV = envVars.NODE_ENV!;
    this.LOGGER_LEVEL = envVars.LOGGER_LEVEL!;
    this.LOGGER_ENABLED = envVars.LOGGER_ENABLED === 'true' || false;
    this.SERVER_DOMAIN = envVars.SERVER_DOMAIN!;
    this.SERVER_PORT =  parseInt(envVars.SERVER_PORT!, 10);
    this.MONGO_URL = envVars.MONGO_URL!;
    this.MONGO_PORT = parseInt(envVars.MONGO_PORT!, 10);
    this.MONGO_DBNAME = envVars.MONGO_DBNAME!;
    this.MONGO_USER = envVars.MONGO_USER!;
    this.MONGO_PASSWORD = envVars.MONGO_PASSWORD!;
  }

  private readonly envVarsSchema: ObjectSchema = joi.object({
    NODE_ENV: joi.string()
      .valid(['development', 'production', 'test', 'provision'])
      .required(),
    LOGGER_LEVEL: joi.string()
      .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
      .default('info'),
    LOGGER_ENABLED: joi.boolean()
      .truthy('TRUE').truthy('true').truthy('1')
      .falsy('FALSE').falsy('false').falsy('0'),
    SERVER_DOMAIN: joi.string()
      .default('localhost'),
    SERVER_PORT: joi.number()
      .default(3000),
    MONGO_URL: joi.string()
      .default('mongodb://localhost'),
    MONGO_PORT: joi.number()
      .default(27017),
    MONGO_DBNAME: joi.string()
      .default('notes'),
    MONGO_USER: joi.string()
      .default('test'),
    MONGO_PASSWORD: joi.string()
      .default('test'),
  }).unknown()
    .required();
}
