"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._PORT = exports.MongoDBUris = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_password = process.env.DB_PASSWORD;
const DB_userName = process.env.DB_USER_NAME;
exports.MongoDBUris = `mongodb+srv://kirill:uyhixqhHNVl3FNfk@cluster0.hxs1t.mongodb.net/calcTest?retryWrites=true&w=majority`;
exports._PORT = 3007;
//# sourceMappingURL=config.js.map