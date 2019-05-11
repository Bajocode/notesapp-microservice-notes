"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHapiResponse = (response, h) => {
    let responseObject = h.response(response.body).code(response.statusCode);
    if (response.headers) {
        for (const header of Object.keys(response.headers)) {
            responseObject = responseObject.header(header, response.headers[header]);
        }
    }
    return responseObject;
};
//# sourceMappingURL=IHttpResponse.js.map