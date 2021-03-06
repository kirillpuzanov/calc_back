"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCharacteristicsCargo = void 0;
const payment_model_1 = __importDefault(require("../model/payment-model"));
const success_result_1 = require("../../../calc-1-main/halpers/statuses/success-result");
const error_result_1 = require("../../../calc-1-main/halpers/statuses/error-result");
const cookie_1 = require("../../../calc-1-main/cookie");
exports.addCharacteristicsCargo = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPaymentId = req.body.currentPaymentId;
    const newPackagingCargo = req.body.packagingCargo;
    if (!currentPaymentId || !newPackagingCargo) {
        error_result_1.errorStatus400(res, 'incomplete data in the request', 404, { currentPaymentId, newPackagingCargo });
    }
    try {
        const updatePackagingCargo = yield payment_model_1.default
            .findByIdAndUpdate({ _id: currentPaymentId }, { packagingCargo: newPackagingCargo }).exec();
        if (!updatePackagingCargo)
            error_result_1.errorStatus400(res, 'not updated, bad request...', 404, { currentPaymentId, newPackagingCargo });
        else {
            cookie_1.resCookie(res, user);
            success_result_1.successResult(res, 'update cargo(s) value success!', 200, newPackagingCargo);
        }
    }
    catch (err) {
        error_result_1.errorStatus500(res, err, 'in addCharacteristicsCargo/updatePackagingCargo');
    }
});
//# sourceMappingURL=addCharacteristicsCargo.js.map