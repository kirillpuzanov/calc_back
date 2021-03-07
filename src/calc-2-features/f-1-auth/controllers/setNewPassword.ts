import {Request, Response} from 'express';
import {passwordValidator} from '../../../calc-1-main/halpers/validators';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import User, {IUser} from '../user-model/user-model';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';


export const setNewPassword = async (req: Request, res: Response) => {
    const {tempToken, password} = req.body;

    if (!passwordValidator(password)) {
        errorStatus400(res, 'Password not valid! must be more than 7 characters', 400)
    } else if (!tempToken) {
        errorStatus400(res, 'No tempToken, Check your request!', 400)
    } else try {
        const user: IUser | null = await User.findOne({resetPasswordToken: tempToken}).exec()
        // если юзер не найден или срок временного токена вышел
        if (!user || (user.resetPasswordTokenDeathTime && user.resetPasswordTokenDeathTime < Date.now())) {
            errorStatus400(res, 'Bad token', 401, {})
        } else {
            try {
                const newUser: IUser | null = await User.findByIdAndUpdate(
                    user._id,
                    password,
                    {new: true}
                ).exec()
                if (!newUser) errorStatus500(res, 'Not Update, error server/DB', 'NewPassword/User.findByIdAndUpdate')
                else {
                    successResult(res, 'SetNewPassword - success!', 201, {})
                }
            } catch (e) {
                //update user усановка нового пароля
                errorStatus500(res, 'Not Update, error server/DB', 'NewPassword/User.findByIdAndUpdate')
            }
        }
    } catch (e) {
        //ищем юзера в БД по темп_токену
        errorStatus500(res, 'Not Update, error server/DB', 'NewPassword/findOne')
    }
}