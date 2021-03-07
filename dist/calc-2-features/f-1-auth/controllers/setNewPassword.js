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
exports.setNewPassword = void 0;
const validators_1 = require("../../../calc-1-main/halpers/validators");
const error_result_1 = require("../../../calc-1-main/halpers/statuses/error-result");
const user_model_1 = __importDefault(require("../user-model/user-model"));
const success_result_1 = require("../../../calc-1-main/halpers/statuses/success-result");
exports.setNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tempToken, password } = req.body;
    if (!validators_1.passwordValidator(password)) {
        error_result_1.errorStatus400(res, 'Password not valid! must be more than 7 characters', 400);
    }
    else if (!tempToken) {
        error_result_1.errorStatus400(res, 'No tempToken, Check your request!', 400);
    }
    else
        try {
            const user = yield user_model_1.default.findOne({ resetPasswordToken: tempToken }).exec();
            // если юзер не найден или срок временного токена вышел
            if (!user || (user.resetPasswordTokenDeathTime && user.resetPasswordTokenDeathTime < Date.now())) {
                error_result_1.errorStatus400(res, 'Bad token', 401, {});
            }
            else {
                try {
                    const newUser = yield user_model_1.default.findByIdAndUpdate(user._id, password, { new: true }).exec();
                    if (!newUser)
                        error_result_1.errorStatus500(res, 'Not Update, error server/DB', 'NewPassword/User.findByIdAndUpdate');
                    else {
                        success_result_1.successResult(res, 'SetNewPassword - success!', 201, {});
                    }
                }
                catch (e) {
                    //update user усановка нового пароля
                    error_result_1.errorStatus500(res, 'Not Update, error server/DB', 'NewPassword/User.findByIdAndUpdate');
                }
            }
        }
        catch (e) {
            //ищем юзера в БД по темп_токену
            error_result_1.errorStatus500(res, 'Not Update, error server/DB', 'NewPassword/findOne');
        }
});
//# sourceMappingURL=setNewPassword.js.map