import {Request, Response} from 'express';
import {validateAuth} from '../../../calc-1-main/halpers/validators';
import User, {IUser} from '../user-model/user-model';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import bcrypt from 'bcrypt';
import {updateGenerateToken} from '../../../calc-1-main/halpers/generateTokken';
import {getMe} from './getMe';

export const login = async (req: Request, res: Response) => {
    const {email, password, rememberMe} = req.body

    if (validateAuth(req, res, 'login')) {
        try {
            // после валидации ищем юзера по email
            const user: IUser | null = await User.findOne({email})
            // если не найден- ошибка 404
            if (!user) {
                errorStatus400(res,  'user with this email is not registered', 404, email)
                // если найден но неверный пароль- ошибка 400
            } else if (!(await bcrypt.compare(password, user.password))) {
                errorStatus400(res, 'not correct email/password', 400)
            } else {
                //если пароль прошел проверку генерируем токен
                const [token, tokenDeathTime] = updateGenerateToken(user._id, rememberMe)

                try {
                    // options {new:true} - findByIdAndUpdate возвращает уже обновленный обьект
                    const newUser: IUser | null = await User.findByIdAndUpdate(
                        user._id,
                        {token, tokenDeathTime, rememberMe: !!rememberMe},
                        {new: true}
                    )
                    if (!newUser) {
                        errorStatus500(res, 'net update, error bd/server', 'logIn/User.findByIdAndUpdate')
                    } else {
                        await getMe(req, res,newUser._doc as IUser)
                    }
                } catch (e) {
                    errorStatus500(res, 'error server/DB', 'loginUser/findByIdAndUpdate')
                }
            }
        } catch (e) {
            errorStatus500(res, 'error server/DB', 'loginUser/findOne')
        }
    }
}