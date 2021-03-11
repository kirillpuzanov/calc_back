import {Request, Response} from 'express';

import User, {IUser} from '../user-model/user-model';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {validateAuth} from '../../../calc-1-main/halpers/validators';


export const registration = async (req: Request, res: Response) => {
    const {email,userName, password,organization} = req.body;

    if (validateAuth(req,res)) {
        try {
            // проверка на существование в базе такое email
            const oldUser: IUser | null = await User.findOne({email})
            if (oldUser) errorStatus400(res, 'email already exists', 400, {email})
            else {
                const user: IUser = await User.create(
                    {
                        email,
                        password,
                        rememberMe: false,
                        isAdmin: false,
                        organization,
                        userName,
                        verified: false,

                        created: new Date(),
                        updated: new Date(),
                    }
                )
                res.status(201).json({
                    status: 'register success',
                    user: {
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                })
            }
        } catch (e) {
            errorStatus500(res, e.message, 'registration/create User')
        }
    }
}
