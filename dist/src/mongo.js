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
const mongoose_1 = __importDefault(require("mongoose"));
const NoteRepository_1 = __importDefault(require("./domain/notes/NoteRepository"));
var MongoState;
(function (MongoState) {
    MongoState["Conntected"] = "connected";
    MongoState["Disconnected"] = "disconnected";
    MongoState["Reconnected"] = "reconnected";
    MongoState["Error"] = "error";
})(MongoState = exports.MongoState || (exports.MongoState = {}));
exports.constructMongoContext = () => __awaiter(this, void 0, void 0, function* () {
    mongoose_1.default.Promise = global.Promise;
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/notes';
    processMongoEvents(mongoose_1.default, mongoUrl);
    ensureGracefulShutdown(mongoose_1.default);
    connect(mongoose_1.default, mongoUrl);
    return {
        notes: new NoteRepository_1.default(),
    };
});
const processMongoEvents = (mongoose, mongoUrl) => {
    mongoose.connection.on(MongoState.Conntected, () => {
        console.log(`Mongo connected: ${mongoUrl}`);
    });
    mongoose.connection.on(MongoState.Error, (error) => {
        console.log(`Mongo connection error: ${error}`);
    });
    mongoose.connection.on(MongoState.Disconnected, () => {
        console.log('Mongo disconnected');
    });
    mongoose.connection.on(MongoState.Reconnected, () => {
        console.log('Mongo reconnected');
    });
};
const ensureGracefulShutdown = (mongoose) => {
    process.on('SIGINT', () => {
        mongoose.connection.close()
            .then(() => {
            console.log('Mongo disconnected through app termination');
            process.exit(0);
        });
    });
};
const connect = (mongoose, mongoUrl) => __awaiter(this, void 0, void 0, function* () {
    yield mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: 10,
        reconnectInterval: 3000,
    }).catch((error) => {
        throw error;
    });
});
//# sourceMappingURL=mongo.js.map