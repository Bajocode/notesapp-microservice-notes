"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String },
}, { toJSON: {
        versionKey: false,
        transform: (doc, ret, options) => {
            ret.id = ret._id;
            delete ret._id;
        },
    } });
//# sourceMappingURL=note.js.map