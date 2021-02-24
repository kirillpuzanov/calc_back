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
exports.addPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loadPlace = req.body.loadPlace;
    if (!loadPlace)
        res.sendStatus(404);
    try {
        const newPayment = yield payment_model_1.default.create({
            loadPlace: loadPlace,
            packagingCargo: [],
            withPallet: '',
            totalCargoValue: {},
            palletParam: {},
            transports: [],
        });
        res.send({ newPayment }).sendStatus(201);
    }
    catch (err) {
        res.sendStatus(500);
    }
});
//# sourceMappingURL=addCargo.js.map