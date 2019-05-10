"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class MongooseRepository {
    constructor(modelName, schema) {
        this.mongooseModel = mongoose_1.model(modelName, schema);
    }
    createOne(item) { }
    createMany(items) { }
    readOne(id) { }
    read(predicate) { }
    readAll() { }
    deleteOne(id) { }
    deleteMany(ids) { }
}
exports.default = MongooseRepository;
//# sourceMappingURL=MongooseRepository.js.map