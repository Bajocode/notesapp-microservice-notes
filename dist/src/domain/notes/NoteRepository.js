"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AMongooseRepository_1 = __importDefault(require("../common/AMongooseRepository"));
const note_1 = require("./note");
class NoteRepository extends AMongooseRepository_1.default {
    constructor() {
        super('Note', note_1.noteSchema);
    }
}
exports.default = NoteRepository;
//# sourceMappingURL=NoteRepository.js.map