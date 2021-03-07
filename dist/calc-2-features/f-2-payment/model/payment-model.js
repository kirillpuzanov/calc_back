"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    user_id: mongoose_1.Schema.Types.ObjectId,
    user_name: String,
    loadPlace: String,
    packagingCargo: [{
            id: String,
            bagType: String,
            cargoTitle: String,
            width: Number,
            height: Number,
            length: Number,
            diameter: Number,
            weight: Number,
            amount: Number,
            inHeight: Boolean,
            inLength: Boolean,
            inWidth: Boolean,
            isStack: Boolean,
            img: String
        }],
    withPallet: String,
    totalCargoValue: {
        cargoVolume: Number,
        cargoMass: Number,
        maxL: Number,
        maxH: Number,
        maxW: Number,
    },
    palletParam: {
        id: String,
        typePallet: String,
        length: Number,
        width: Number,
        height: Number,
        carryingCapacity: Number,
        maxLoadingHeight: Number,
        separatorSheetHeight: Number,
        img: String
    },
    transports: [{
            id: String,
            car_name: String,
            car_char: String,
            car_o: Number,
            car_l: Number,
            car_w: Number,
            car_h: Number,
            car_m: Number,
            img: String
        }],
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
});
const PaymentModel = mongoose_1.model('payment', PaymentSchema);
exports.default = PaymentModel;
//# sourceMappingURL=payment-model.js.map