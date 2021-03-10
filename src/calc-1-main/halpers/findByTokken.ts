import User, {IUser} from '../../calc-2-features/f-1-auth/user-model/user-model';
import {Request, Response} from 'express';
import {errorStatus400, errorStatus500} from './statuses/error-result';
import {updateGenerateToken} from './generateTokken';

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


export const findUserByToken = (
    f: (request: Request, res: Response, user: IUser) => void) => async (req: Request, res: Response) => {

    // const decodedToken = jsonwebtoken.verify(req.cookies.token, process.env.SECRET_KEY as string) as { id: string };
    const token = req.cookies.token;
    try {
        const user: IUser | null = await User.findOne({token}).exec();
        // если юзер - 'false',tokenDeathTime - 'false' (для TS), время токена истекло
        if (!user || !user.tokenDeathTime || user.tokenDeathTime < new Date().getTime()) {
            errorStatus400(res, 'you are not authorized', 401)
        } else {
            try {
                const newUser: IUser | null = await User.findById(
                    user._id,
                ).exec();
                // если  юзер не найден в БД...
                if (!newUser) {
                    errorStatus500(res, 'Server error, user not found in DB', 'User.findByIdAndUpdate')
                } else {
                    f(req, res, newUser._doc as IUser)
                }
            } catch (e) {
                errorStatus500(res, 'not updated, back has broken', 'User.findByIdAndUpdate')
            }
        }
    } catch (e) {
        errorStatus500(res, 'not updated, back has broken', '/findUserByToken/User.findOne')
    }
};