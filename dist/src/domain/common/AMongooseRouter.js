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
const IHttpResponse_1 = require("./IHttpResponse");
class AMongooseRouter {
    post(controller, validator, domainName) {
        return {
            method: 'POST',
            path: `/${domainName}`,
            handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                const response = yield controller.handlePost(request.payload);
                return IHttpResponse_1.toHapiResponse(response, h);
            }),
            options: {
                validate: { payload: validator.payloadCreateSchema },
                description: `POST ${domainName.slice(0, -1)}`,
                notes: `Create a new ${domainName.slice(0, -1)} with a valid payload`,
                tags: ['api'],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            201: { description: 'Created' },
                            400: { description: 'Bad Request' },
                        },
                    },
                },
            },
        };
    }
    get(controller, domainName) {
        return {
            method: 'GET',
            path: `/${domainName}`,
            handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                const response = yield controller.handleGet();
                return IHttpResponse_1.toHapiResponse(response, h);
            }),
            options: {
                description: `GET ${domainName.slice(0, -1)}`,
                notes: `Retrieve all ${domainName}`,
                tags: ['api'],
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            200: { description: 'OK' },
                            400: { description: 'Bad Request' },
                        },
                    },
                },
            },
        };
    }
}
exports.default = AMongooseRouter;
//# sourceMappingURL=AMongooseRouter.js.map