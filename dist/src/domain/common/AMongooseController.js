"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AMongooseController {
    constructor(repository, domainName) {
        this.repository = repository;
        this.domainName = domainName;
    }
    handlePost(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this.repository.createOne(body);
            return {
                statusCode: 201,
                body: document.toJSON(),
                headers: { location: `/${this.domainName}/${document.id}` },
            };
        });
    }
    handleGet() {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield this.repository.readAll();
            const transportObjects = documents.map(i => i.toJSON());
            return {
                statusCode: 200,
                body: transportObjects,
            };
        });
    }
}
exports.default = AMongooseController;
//# sourceMappingURL=AMongooseController.js.map