"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("hapi");
const inert_1 = __importDefault(require("inert"));
const vision_1 = __importDefault(require("vision"));
const hapi_swagger_1 = __importDefault(require("hapi-swagger"));
const package_json_1 = __importDefault(require("../package.json"));
const NoteValidator_1 = __importDefault(require("./domain/notes/NoteValidator"));
const notes_1 = __importDefault(require("./domain/notes"));
exports.constructServer = (context) => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = instantiateServer();
        yield registerComponents(server, context);
        registerRoutes(server, context);
        return server;
    }
    catch (error) {
        console.log(`Error constructing server: ${error}`);
        throw error;
    }
});
const instantiateServer = () => {
    return new hapi_1.Server({
        port: 3000,
        host: 'localhost',
        debug: { request: ['error'] },
    });
};
const registerComponents = (server, context) => __awaiter(this, void 0, void 0, function* () {
    Promise.all([
        server.register([inert_1.default, vision_1.default]),
        server.register({
            plugin: hapi_swagger_1.default,
            options: {
                info: {
                    title: package_json_1.default.name,
                    version: package_json_1.default.version,
                },
            },
        }),
    ]);
});
const registerRoutes = (server, context) => {
    const validator = {
        notes: new NoteValidator_1.default(),
    };
    notes_1.default(server, context, validator);
};
//# sourceMappingURL=server.js.map