"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class AMongooseRepository {
    constructor(modelName, schema) {
        this.mongooseModel = mongoose_1.model(modelName, schema);
    }
    createOne(item) {
        return this.mongooseModel.create(item);
    }
    createMany(items) {
        return this.mongooseModel.create(items);
    }
    readOne(idOrPredicate) {
        const query = (typeof idOrPredicate === 'string') ?
            this.mongooseModel.findById(idOrPredicate) :
            this.mongooseModel.findOne(idOrPredicate);
        return query.exec();
    }
    read(predicate) {
        return this.mongooseModel.find(predicate).exec();
    }
    readAll() {
        return this.mongooseModel.find().exec();
    }
    deleteOne(id) {
        return this.mongooseModel.findByIdAndDelete(id).exec();
    }
}
exports.default = AMongooseRepository;
//# sourceMappingURL=AMongooseRepository.js.map