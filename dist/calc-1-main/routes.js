"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const index_payment_1 = __importDefault(require("../calc-2-features/f-2-payment/index-payment"));
const index_auth_1 = __importDefault(require("../calc-2-features/f-1-auth/index-auth"));
exports.routes = (app) => {
    //  app.use('/users', users)
    app.use('/auth', index_auth_1.default);
    app.use('/', index_payment_1.default);
    // * '?' PNF 404
    app.use((req, res) => {
        console.log("Bad request, url: ", req.method, req.url);
        res.status(404).json({
            error: "bad url",
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        });
    });
};
//# sourceMappingURL=routes.js.map