import joi, { ObjectSchema } from 'joi';

export default class Config {
  public readonly NODE_ENV: string;
  public readonly LOGGER_LEVEL: string;
  public readonly LOGGER_ENABLED: boolean;
  public readonly SERVER_DOMAIN: string;
  public readonly SERVER_PORT: number;
  public readonly MONGODB_URL: string;
  public readonly MONGODB_PORT: number;
  public readonly MONGODB_DATABASE: string;
  public readonly MONGODB_USERNAME: string;
  public readonly MONGODB_PASSWORD: string;

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
    this.MONGODB_URL = envVars.MONGODB_URL!;
    this.MONGODB_PORT = parseInt(envVars.MONGODB_PORT!, 10);
    this.MONGODB_DATABASE = envVars.MONGODB_DATABASE!;
    this.MONGODB_USERNAME = envVars.MONGODB_USERNAME!;
    this.MONGODB_PASSWORD = envVars.MONGODB_PASSWORD!;
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
      .default('0.0.0.0'),
    SERVER_PORT: joi.number()
      .default(3000),
    MONGODB_URL: joi.string()
      .default('mongodb://localhost'),
    MONGODB_PORT: joi.number()
      .default(27017),
    MONGODB_DATABASE: joi.string()
      .default('notes'),
    MONGODB_USERNAME: joi.string()
      .default('test'),
    MONGODB_PASSWORD: joi.string()
      .default('test'),
  }).unknown()
    .required();
}
