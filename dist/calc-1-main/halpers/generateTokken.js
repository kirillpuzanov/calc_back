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
exports.updateGenerateToken = exports.generateResetPasswordToken = void 0;
const user_model_1 = __importDefault(require("../../calc-2-features/f-1-auth/user-model/user-model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.generateResetPasswordToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const resetPasswordToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.SECRET_KEY);
    // const resetPasswordToken = v1()
    yield user_model_1.default.findByIdAndUpdate(userId, { resetPasswordToken, resetPasswordTokenDeathTime: Date.now() + (1000 * 60 * 10) }, // 10 min
    { new: true }).exec();
    return resetPasswordToken;
});
exports.updateGenerateToken = (userId, rememberMe) => {
    const token = jsonwebtoken_1.default.sign({ id: userId }, process.env.SECRET_KEY);
    // const token = v1();
    const tokenDeathTime = rememberMe
        ? Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 days
        : Date.now() + (1000 * 60 * 60 * 3); // 3 hours
    return [token, tokenDeathTime];
};
//# sourceMappingURL=generateTokken.js.map