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
exports.registration = void 0;
const user_model_1 = __importDefault(require("../user-model/user-model"));
const error_result_1 = require("../../../calc-1-main/halpers/statuses/error-result");
const validators_1 = require("../../../calc-1-main/halpers/validators");
exports.registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (validators_1.validateAuth(req, res, 'registration')) {
        try {
            // проверка на существование в базе такое email
            const oldUser = yield user_model_1.default.findOne({ email });
            if (oldUser)
                error_result_1.errorStatus400(res, 'email already exists', 400, { email });
            else {
                const user = yield user_model_1.default.create({
                    email,
                    password,
                    rememberMe: false,
                    isAdmin: false,
                    name: email,
                    verified: false,
                    created: new Date(),
                    updated: new Date(),
                });
                res.status(201).json({
                    status: 'success',
                    user: {
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                });
                // successResult(res, 'new user create!', 201, {user})
            }
        }
        catch (e) {
            error_result_1.errorStatus500(res, e.message, 'registration/create User');
        }
    }
});
//# sourceMappingURL=registration.js.map