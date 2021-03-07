"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addCharacteristicsCargo_1 = require("./controllers/addCharacteristicsCargo");
const addPayment_1 = require("./controllers/addPayment");
const findByTokken_1 = require("../../calc-1-main/halpers/findByTokken");
const pallet_noPallet_1 = require("./controllers/pallet_noPallet");
const payment = express_1.default.Router();
payment.post('/s_payment', findByTokken_1.findUserByToken(addPayment_1.addPayment));
payment.put('/packing', findByTokken_1.findUserByToken(addCharacteristicsCargo_1.addCharacteristicsCargo));
payment.put('/withPallet', findByTokken_1.findUserByToken(pallet_noPallet_1.isWithPallet));
exports.default = payment;
//# sourceMappingURL=index-payment.js.map