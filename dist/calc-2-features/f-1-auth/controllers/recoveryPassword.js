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
exports.recoveryPassword = void 0;
const validators_1 = require("../../../calc-1-main/halpers/validators");
const error_result_1 = require("../../../calc-1-main/halpers/statuses/error-result");
const user_model_1 = __importDefault(require("../user-model/user-model"));
const generateTokken_1 = require("../../../calc-1-main/halpers/generateTokken");
const gmail_1 = require("../../../calc-1-main/mail/gmail");
const success_result_1 = require("../../../calc-1-main/halpers/statuses/success-result");
exports.recoveryPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, from } = req.body;
    // валидируем email
    if (!validators_1.emailValidator(email)) {
        error_result_1.errorStatus400(res, 'not valid email address.', 400, { email }, 'recoveryPass/emailValidator');
    }
    else {
        try {
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                error_result_1.errorStatus400(res, 'Email not found', 400, { email }, 'recoveryPass/email');
            else {
                try {
                    // создаем временный токен, для утановки нового пароля
                    const tempToken = yield generateTokken_1.generateResetPasswordToken(user._id);
                    // формируем письмо для отправки на почту пользователя
                    const html = (`<div style="padding: 10px">
                            <b>Password recovery link &#8659 &#8659 &#8659</b> 
                            <div style="margin-top: 10px">
                                <a href="http://localhost:3000/#/new-pass/${tempToken}">
                                 Go to the recovery password page...
                                </a>
                            </div>
                        </div>`);
                    const fromFinal = from || 'Test cargo calculate <testcalcpiter@gmail.com>';
                    const sendMailtoUser = yield gmail_1.sendMail(fromFinal, email, 'password recovery', html);
                    if (sendMailtoUser.accepted && sendMailtoUser.accepted.length > 0) {
                        success_result_1.successResult(res, `sent mail to ${email} success`, 200, { email });
                    }
                    else
                        error_result_1.errorStatus500(res, 'sent mail error', 'recovery pass, sentMail');
                }
                catch (e) {
                    //error отправка письма на восстановление пароля
                    error_result_1.errorStatus500(res, e.message, 'recoveryPass/sentMail');
                }
            }
        }
        catch (e) {
            // error поиск юзера по емаил в БД
            error_result_1.errorStatus500(res, e.message, 'recoveryPass/not found Mail in DB');
        }
    }
});
//# sourceMappingURL=recoveryPassword.js.map