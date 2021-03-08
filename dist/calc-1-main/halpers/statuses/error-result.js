"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorStatus500 = exports.errorStatus400 = void 0;
exports.errorStatus400 = (res, error, statusCodeError, input_data) => {
    res.status(statusCodeError).json({
        error: error,
        statusCode: statusCodeError,
        input_data,
    });
};
exports.errorStatus500 = (res, error, input_data) => {
    const errorObj = {
        error: error.message,
        statusCode: 500,
        input_data,
    };
    res.status(500).json({ errorObj });
};
//# sourceMappingURL=error-result.js.map