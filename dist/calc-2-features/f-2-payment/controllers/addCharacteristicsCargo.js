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
exports.addCharacteristicsCargo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchIdPayment = req.body.searchIdPayment;
    const newPackagingCargo = req.body.packagingCargo;
    if (!searchIdPayment || !newPackagingCargo)
        res.sendStatus(404);
    try {
        yield payment_model_1.default.findByIdAndUpdate({ _id: searchIdPayment }, { packagingCargo: newPackagingCargo });
        res.send({ message: 'update object_Payment success!' });
    }
    catch (err) {
        res.sendStatus(500);
    }
});
//# sourceMappingURL=addCharacteristicsCargo.js.map