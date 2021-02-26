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
exports.addPayment = void 0;
const payment_model_1 = __importDefault(require("../model/payment-model"));
const error_result_1 = require("../../../calc-1-main/halpers/statuses/error-result");
const success_result_1 = require("../../../calc-1-main/halpers/statuses/success-result");
exports.addPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loadPlace = req.body.loadPlace;
    if ((loadPlace !== 'Грузовик') && (loadPlace !== 'Контейнер')) {
        error_result_1.errorStatus400(res, 'not create payment/add loadPlace, bad request...', 400, loadPlace);
    }
    try {
        const newPayment = yield payment_model_1.default.create({
            loadPlace: loadPlace,
            packagingCargo: [],
            withPallet: '',
            totalCargoValue: {},
            palletParam: {},
            transports: [],
        });
        if (!newPayment) {
            error_result_1.errorStatus400(res, '11', 400, loadPlace);
        }
        else {
            success_result_1.successResult(res, 'create payment/add loadPlace success!', 200, loadPlace);
        }
    }
    catch (err) {
        error_result_1.errorStatus500(res, err, 'in addPayment/newPayment');
    }
});
//# sourceMappingURL=addPayment.js.map