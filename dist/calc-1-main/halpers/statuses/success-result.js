"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResult = void 0;
exports.successResult = (res, message, statusCode, input_data) => {
    res.status(statusCode).json({
        message: message,
        statusCode: statusCode,
        input_data: input_data
    });
};
//# sourceMappingURL=success-result.js.map