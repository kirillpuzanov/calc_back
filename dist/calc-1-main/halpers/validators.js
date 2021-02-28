"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = exports.passwordValidator = exports.emailValidator = exports.emailRegExp = void 0;
const error_result_1 = require("./statuses/error-result");
exports.emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;
exports.emailValidator = (email) => exports.emailRegExp.test(email); // true - valid
exports.passwordValidator = (password) => password.length > 7; // true - valid
exports.validateAuth = (req, res, inPlace) => {
    const { email, password } = req.body;
    const isEmailValid = exports.emailValidator(email);
    const isPassValid = exports.passwordValidator(password);
    if (!isEmailValid || !isPassValid) {
        error_result_1.errorStatus400(res, 'not valid email/password', 400, { passwordRegExp: 'Password must be more than 7 characters...' }, inPlace);
        return false;
    }
    else
        return true;
};
//# sourceMappingURL=validators.js.map