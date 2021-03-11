"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._PORT = exports.MongoDBUris = exports.DEV_VERSION = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
exports.DEV_VERSION = false;
exports.DEV_VERSION && dotenv_1.default.config();
const _DB_PASSWORD = process.env.DB_PASSWORD;
exports.MongoDBUris = `mongodb+srv://kirill:${_DB_PASSWORD}@cluster0.hxs1t.mongodb.net/calcTest?retryWrites=true&w=majority`;
exports._PORT = 3007;
//# sourceMappingURL=config.js.map