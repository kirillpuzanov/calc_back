"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    }
});
const UserCalc = mongoose_1.model('UserCalc', userSchema);
exports.default = UserCalc;
//# sourceMappingURL=user-model.js.map