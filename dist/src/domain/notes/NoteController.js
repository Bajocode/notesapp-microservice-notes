"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AMongooseController_1 = __importDefault(require("../common/AMongooseController"));
class NoteController extends AMongooseController_1.default {
    constructor(context) {
        super(context.notes, 'notes');
        this.context = context;
    }
}
exports.default = NoteController;
//# sourceMappingURL=NoteController.js.map