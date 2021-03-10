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
exports.login = void 0;
const validators_1 = require("../../../calc-1-main/halpers/validators");
const user_model_1 = __importDefault(require("../user-model/user-model"));
const error_result_1 = require("../../../calc-1-main/halpers/statuses/error-result");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateTokken_1 = require("../../../calc-1-main/halpers/generateTokken");
const getMe_1 = require("./getMe");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, rememberMe } = req.body;
    if (validators_1.validateAuth(req, res)) {
        try {
            // после валидации ищем юзера по email
            const user = yield user_model_1.default.findOne({ email });
            // если не найден- ошибка 404
            if (!user) {
                error_result_1.errorStatus400(res, 'user with this email is not registered', 404, email);
                // если найден но неверный пароль- ошибка 400
            }
            else if (!(yield bcryptjs_1.default.compare(password, user.password))) {
                error_result_1.errorStatus400(res, 'not correct email/password', 400);
            }
            else {
                //если пароль прошел проверку генерируем токен
                const [token, tokenDeathTime] = generateTokken_1.updateGenerateToken(user._id, rememberMe);
                try {
                    // options {new:true} - findByIdAndUpdate возвращает уже обновленный обьект
                    const newUser = yield user_model_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime, rememberMe: !!rememberMe }, { new: true }).exec();
                    if (!newUser) {
                        error_result_1.errorStatus500(res, 'net update, error bd/server', 'logIn/User.findByIdAndUpdate');
                    }
                    else {
                        yield getMe_1.getMe(req, res, newUser._doc);
                    }
                }
                catch (e) {
                    error_result_1.errorStatus500(res, 'error server/DB', 'loginUser/findByIdAndUpdate');
                }
            }
        }
        catch (e) {
            error_result_1.errorStatus500(res, 'error server/DB', 'loginUser/findOne');
        }
    }
});
//# sourceMappingURL=login.js.map