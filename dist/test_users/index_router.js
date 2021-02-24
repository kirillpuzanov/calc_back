"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addUser_1 = require("./controllers/addUser");
const getUsers_1 = require("./controllers/getUsers");
const deleteUser_1 = require("./controllers/deleteUser");
const updateUser_1 = require("./controllers/updateUser");
const users = express_1.default.Router();
users.get('/', getUsers_1.getUsersDB);
users.get('/:id', getUsers_1.getUser);
users.post('/', addUser_1.addUser);
users.delete('/:id', deleteUser_1.deleteUser);
users.put('/', updateUser_1.updateUser);
exports.default = users;
//# sourceMappingURL=index_router.js.map