"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AMongooseRouter_1 = __importDefault(require("../common/AMongooseRouter"));
class NoteRouter extends AMongooseRouter_1.default {
    constructor(server, controller, validator) {
        super();
        const domainName = 'notes';
        server.route([
            super.post(controller, validator.notes, domainName),
            super.get(controller, domainName),
        ]);
    }
}
exports.default = NoteRouter;
//# sourceMappingURL=NoteRouter.js.map