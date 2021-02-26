"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const cookie_1 = require("../../../calc-1-main/cookie");
exports.getMe = (res, req, user) => {
    const body = Object.assign({}, user);
    delete body.password; // don't send password to the front
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;
    cookie_1.resCookie(res, user).status(200).json(Object.assign({}, body));
};
//# sourceMappingURL=getMe.js.map