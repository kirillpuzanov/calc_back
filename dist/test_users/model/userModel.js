"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    }
});
const User = mongoose_1.model('user', userSchema);
exports.default = User;
// export const User = model<IUser>('user', userSchema)
//# sourceMappingURL=userModel.js.map