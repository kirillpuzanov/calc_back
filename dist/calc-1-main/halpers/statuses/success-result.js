"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResult = void 0;
exports.successResult = (res, message, statusCode, input_data) => {
    return res.send({
        message: message,
        statusCode: statusCode,
        input_data: input_data
    }).sendStatus(statusCode);
};
//# sourceMappingURL=success-result.js.map