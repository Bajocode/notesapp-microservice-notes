"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ACrudValidator_1 = __importDefault(require("../common/ACrudValidator"));
class NoteValidator extends ACrudValidator_1.default {
    constructor() {
        super(...arguments);
        this.payloadCreateSchema = joi_1.default
            .object()
            .keys({
            title: joi_1.default.string().required(),
            body: joi_1.default.string().allow(''),
        });
        this.payloadUpdateSchema = joi_1.default.object();
    }
}
exports.default = NoteValidator;
//# sourceMappingURL=NoteValidator.js.map