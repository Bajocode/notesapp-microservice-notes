"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Config {
    constructor() {
        this.envVarsSchema = joi_1.default.object({
            NODE_ENV: joi_1.default.string()
                .valid(['development', 'production', 'test', 'provision'])
                .required(),
            LOGGER_LEVEL: joi_1.default.string()
                .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
                .default('info'),
            LOGGER_ENABLED: joi_1.default.boolean()
                .truthy('TRUE').truthy('true').truthy('1')
                .falsy('FALSE').falsy('false').falsy('0'),
            SERVER_DOMAIN: joi_1.default.string()
                .default('localhost'),
            SERVER_PORT: joi_1.default.number()
                .default(3000),
            MONGO_URL: joi_1.default.string()
                .default('mongodb://localhost'),
            MONGO_PORT: joi_1.default.number()
                .default(27017),
            MONGO_DBNAME: joi_1.default.string()
                .default('notes'),
        }).unknown()
            .required();
        const { error, value: envVars } = joi_1.default.validate(process.env, this.envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        this.NODE_ENV = envVars.NODE_ENV;
        this.LOGGER_LEVEL = envVars.LOGGER_LEVEL;
        this.LOGGER_ENABLED = envVars.LOGGER_ENABLED === 'true' || false;
        this.SERVER_DOMAIN = envVars.SERVER_DOMAIN;
        this.SERVER_PORT = parseInt(envVars.SERVER_PORT, 10);
        this.MONGO_URL = envVars.MONGO_URL;
        this.MONGO_PORT = parseInt(envVars.MONGO_PORT, 10);
        this.MONGO_DBNAME = envVars.MONGO_DBNAME;
    }
}
exports.default = Config;
//# sourceMappingURL=Config.js.map