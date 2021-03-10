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
exports.findUserByToken = void 0;
const user_model_1 = __importDefault(require("../../calc-2-features/f-1-auth/user-model/user-model"));
const error_result_1 = require("./statuses/error-result");
//
// export const findUserByToken = (
//     f: (request: Request, res: Response, user: IUser) => void) => async (req: Request, res: Response) => {
//
//     // const decodedToken = jsonwebtoken.verify(req.cookies.token, process.env.SECRET_KEY as string) as { id: string };
//     const token = req.cookies.token;
//     try {
//         const user: IUser | null = await User.findOne({token}).exec();
//         // если юзер - 'false',tokenDeathTime - 'false' (для TS), время токена истекло
//         if (!user || !user.tokenDeathTime || user.tokenDeathTime < new Date().getTime()) {
//             errorStatus400(res, 'you are not authorized', 401)
//         } else {
//             // иначе (если все есть ) обновляем токкен и его срок...
//             //todo нужно ди обновлять токен?? или достаточно только срок жизни токена ??
//             const [token, tokenDeathTime] = updateGenerateToken(user._id, user.rememberMe);
//             try {
//                 const newUser: IUser | null = await User.findByIdAndUpdate(
//                     user._id,
//                     {token, tokenDeathTime},
//                     {new: true}
//                 ).exec();
//                 // если данные юзера не обновились в БД...
//                 if (!newUser) {
//                     errorStatus500(res, 'not updated, database not responding', 'User.findByIdAndUpdate')
//                 } else {
//                     f(req, res, newUser._doc as IUser)
//                 }
//             } catch (e) {
//                 errorStatus500(res, 'not updated, back has broken', 'User.findByIdAndUpdate')
//             }
//         }
//     } catch (e) {
//         errorStatus500(res, 'not updated, back has broken', '/findUserByToken/User.findOne')
//     }
// };
exports.findUserByToken = (f) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const decodedToken = jsonwebtoken.verify(req.cookies.token, process.env.SECRET_KEY as string) as { id: string };
    const token = req.cookies.token;
    try {
        const user = yield user_model_1.default.findOne({ token }).exec();
        // если юзер - 'false',tokenDeathTime - 'false' (для TS), время токена истекло
        if (!user || !user.tokenDeathTime || user.tokenDeathTime < new Date().getTime()) {
            error_result_1.errorStatus400(res, 'you are not authorized', 401);
        }
        else {
            try {
                const newUser = yield user_model_1.default.findById(user._id).exec();
                // если  юзер не найден в БД...
                if (!newUser) {
                    error_result_1.errorStatus500(res, 'Server error, user not found in DB', 'User.findByIdAndUpdate');
                }
                else {
                    f(req, res, newUser._doc);
                }
            }
            catch (e) {
                error_result_1.errorStatus500(res, 'not updated, back has broken', 'User.findByIdAndUpdate');
            }
        }
    }
    catch (e) {
        error_result_1.errorStatus500(res, 'not updated, back has broken', '/findUserByToken/User.findOne');
    }
});
//# sourceMappingURL=findByTokken.js.map