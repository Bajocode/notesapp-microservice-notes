"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
const server_1 = require("./server");
const logger_1 = require("./logger");
const Config_1 = __importDefault(require("./Config"));
exports.bootstrap = () => __awaiter(this, void 0, void 0, function* () {
    const config = new Config_1.default();
    const logger = logger_1.constructLogger(config);
    try {
        const context = yield mongo_1.constructMongoContext(config, logger);
        const server = yield server_1.constructServer(config, logger, context);
        yield server.start();
        logger.info(`Server started: ${server.info.uri}/documentation`);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
});
//# sourceMappingURL=bootstrap.js.map