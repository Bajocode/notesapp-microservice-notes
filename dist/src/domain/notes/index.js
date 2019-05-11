"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoteRouter_1 = __importDefault(require("./NoteRouter"));
const NoteController_1 = __importDefault(require("./NoteController"));
const init = (server, context, validator) => {
    const controller = new NoteController_1.default(context);
    new NoteRouter_1.default(server, controller, validator);
};
exports.default = init;
//# sourceMappingURL=index.js.map