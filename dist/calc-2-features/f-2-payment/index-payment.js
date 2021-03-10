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
const palletParam_1 = require("./controllers/palletParam");
const transports_1 = require("./controllers/transports");
const placementCargo_totalValue_1 = require("./controllers/placementCargo_totalValue");
const payment = express_1.default.Router();
payment.post('/s_payment', findByTokken_1.findUserByToken(addPayment_1.addPayment));
payment.put('/packing', findByTokken_1.findUserByToken(addCharacteristicsCargo_1.addCharacteristicsCargo));
payment.put('/withPallet', findByTokken_1.findUserByToken(pallet_noPallet_1.isWithPallet));
payment.put('/palletParam', findByTokken_1.findUserByToken(palletParam_1.palletParam));
payment.put('/placement', findByTokken_1.findUserByToken(placementCargo_totalValue_1.placementCargo_totalValue));
payment.put('/transports', findByTokken_1.findUserByToken(transports_1.transports));
exports.default = payment;
//# sourceMappingURL=index-payment.js.map