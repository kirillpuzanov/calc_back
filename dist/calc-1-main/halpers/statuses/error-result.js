"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorStatus500 = exports.errorStatus400 = void 0;
exports.errorStatus400 = (res, error, statusCodeError, input_data) => {
    res.send({
        error: error,
        statusCode: statusCodeError,
        input_data: input_data
    }).sendStatus(statusCodeError);
};
exports.errorStatus500 = (res, error, inPlace) => {
    const errorObj = {
        error: 'some error: ' + error.message,
        statusCode: 500,
        inPlace: inPlace
    };
    console.log('Error Server/DB', errorObj);
    res.send(errorObj).sendStatus(500);
};
//# sourceMappingURL=error-result.js.map