"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resCookie = exports.cookie = exports.cookieSettings = void 0;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.cookieSettings = { sameSite: 'none', secure: true };
// export const cookieSettings = {}; если локально
exports.cookie = (app) => {
    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            console.log('origin: ', origin);
            callback(null, true); // everyone is allowed
        }
    };
    app.use(cors_1.default(corsOptions));
    app.use(cookie_parser_1.default());
};
exports.resCookie = (res, user) => {
    return res.cookie('token', user.token, Object.assign(Object.assign({}, exports.cookieSettings), { expires: new Date(user.tokenDeathTime || 0) }));
};
//# sourceMappingURL=cookie.js.map