"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appUse = void 0;
const cookie_1 = require("./cookie");
exports.appUse = (app) => {
    cookie_1.cookie(app);
    // log middleware
    app.use((req, res, next) => {
        console.log("Time: ", new Date().toString());
        console.log("-----", req.method, req.url, "params:", req.params);
        console.log("query:", req.query);
        console.log("body:", req.body);
        console.log("cookies:", req.cookies);
        // console.log("headers:", req.headers);
        // console.log("rawHeaders:", req.rawHeaders);
        next();
    });
};
//# sourceMappingURL=appUse.js.map