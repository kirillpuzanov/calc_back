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
exports.isWithPallet = void 0;
const payment_model_1 = __importDefault(require("../model/payment-model"));
const error_result_1 = require("../../../calc-1-main/halpers/statuses/error-result");
const cookie_1 = require("../../../calc-1-main/cookie");
const success_result_1 = require("../../../calc-1-main/halpers/statuses/success-result");
exports.isWithPallet = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { withPallet, currentPaymentId } = req.body;
    if (!withPallet || !currentPaymentId) {
        error_result_1.errorStatus400(res, 'incomplete data in the request', 404, { withPallet, currentPaymentId });
    }
    try {
        const updatePackagingCargo = yield payment_model_1.default
            .findByIdAndUpdate({ _id: currentPaymentId }, { withPallet }).exec();
        if (!updatePackagingCargo)
            error_result_1.errorStatus400(res, 'not updated, bad request.../withPallet/findByIdAndUpdate', 404, { withPallet, currentPaymentId });
        else {
            cookie_1.resCookie(res, user);
            success_result_1.successResult(res, 'update cargo(s) value success!', 200, { withPallet });
        }
    }
    catch (err) {
        error_result_1.errorStatus500(res, err, 'in withPallet/findByIdAndUpdate');
    }
});
//# sourceMappingURL=pallet_noPallet.js.map