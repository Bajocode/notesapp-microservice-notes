"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.constructLogger = (config) => {
    const timeStampFormat = winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    });
    const consoleFormat = winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`);
    const consoleTransport = new winston_1.transports.Console({
        level: config.LOGGER_LEVEL,
        format: winston_1.format.combine(winston_1.format.colorize(), consoleFormat),
    });
    return winston_1.createLogger({
        level: config.LOGGER_LEVEL,
        format: winston_1.format.combine(timeStampFormat, winston_1.format.json()),
        transports: [
            consoleTransport,
        ],
    });
};
//# sourceMappingURL=logger.js.map