"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("./controllers/login");
const registerNewUser_1 = require("./controllers/registerNewUser");
const recoveryPassword_1 = require("./controllers/recoveryPassword");
const setNewPassword_1 = require("./controllers/setNewPassword");
const getMe_1 = require("./controllers/getMe");
const updateUser_1 = require("./controllers/updateUser");
const logout_1 = require("./controllers/logout");
const findByTokken_1 = require("../../calc-1-main/halpers/findByTokken");
const auth = express_1.default.Router();
auth.post('/login', login_1.login);
auth.post('/register', registerNewUser_1.registerNewUser);
auth.post('/forgot', recoveryPassword_1.recoveryPassword);
auth.post('/set_new_pass', setNewPassword_1.setNewPassword);
auth.post('/me', findByTokken_1.findUserByToken, getMe_1.getMe);
auth.put('/me', findByTokken_1.findUserByToken, updateUser_1.updateUser);
auth.delete('/me', findByTokken_1.findUserByToken, logout_1.logout);
exports.default = auth;
//# sourceMappingURL=index-auth.js.map