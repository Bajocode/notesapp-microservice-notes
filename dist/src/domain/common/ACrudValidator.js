"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class ACrudValidator {
    constructor() {
        this.paramsObjectIdSchema = joi_1.default.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/);
        this.jwtSchema = joi_1.default
            .object({
            authorization: joi_1.default.string()
                .required(),
        })
            .unknown();
    }
}
exports.default = ACrudValidator;
//# sourceMappingURL=ACrudValidator.js.map