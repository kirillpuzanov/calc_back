import {Request, Response} from 'express';
import {emailValidator} from '../../../calc-1-main/halpers/validators';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import User, {IUser} from '../user-model/user-model';
import {generateResetPasswordToken} from '../../../calc-1-main/halpers/generateTokken';
import {sendMail} from '../../../calc-1-main/mail/gmail';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';


export const recoveryPassword = async (req: Request, res: Response) => {
    const {email, from} = req.body

    // валидируем email
    if (!emailValidator(email)) {
        errorStatus400(res, 'not valid email address.', 400, {email}, 'recoveryPass/emailValidator')
    } else {
        try {
            const user: IUser | null = await User.findOne({email})
            if (!user) errorStatus400(res, 'Email not found', 400, {email}, 'recoveryPass/email')
            else {
                try {
                    // создаем временный токен, для утановки нового пароля
                    const tempToken = await generateResetPasswordToken(user._id)
                    // формируем письмо для отправки на почту пользователя
                    const html = (
                        `<div style="padding: 10px">
                            <b>Password recovery link &#8659 &#8659 &#8659</b> 
                            <div style="margin-top: 10px">
                                <a href="http://localhost:3000/#/new-pass/${tempToken}">
                                 Go to the recovery password page...
                                </a>
                            </div>
                        </div>`)

                    const fromFinal = from || 'Test cargo calculate <testcalcpiter@gmail.com>'

                    const sendMailtoUser = await sendMail(
                        fromFinal,
                        email,
                        'password recovery',
                        html
                    )
                    if (sendMailtoUser.accepted && sendMailtoUser.accepted.length > 0) {
                        successResult(res, `sent mail to ${email} success`, 200, {email})
                    } else errorStatus500(res, 'sent mail error', 'recovery pass, sentMail')

                } catch (e) {
                    //error отправка письма на восстановление пароля
                    errorStatus500(res, e.message,'recoveryPass/sentMail' )
                }
            }
        } catch (e) {
            // error поиск юзера по емаил в БД
            errorStatus500(res, e.message,'recoveryPass/not found Mail in DB' )
        }
    }
}

