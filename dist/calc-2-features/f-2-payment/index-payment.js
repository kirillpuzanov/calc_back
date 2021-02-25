"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addCharacteristicsCargo_1 = require("./controllers/addCharacteristicsCargo");
const addPayment_1 = require("./controllers/addPayment");
const payment = express_1.default.Router();
payment.post('/s_payment', addPayment_1.addPayment);
payment.put('/packing', addCharacteristicsCargo_1.addCharacteristicsCargo);
exports.default = payment;
//# sourceMappingURL=index-payment.js.map