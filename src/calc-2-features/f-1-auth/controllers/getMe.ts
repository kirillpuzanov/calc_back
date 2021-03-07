import {IUser} from '../user-model/user-model';
import {resCookie} from '../../../calc-1-main/cookie';
import {Request, Response} from "express";

export const getMe = async (req: Request, res: Response,user: IUser) => {

    const body: any = {...user};

    delete body.password; // не обязательно , т.к. зашифрован
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;
    delete body.__v;
    delete body.created;
    delete body.updated;
    delete body.token;
    delete body.tokenDeathTime;

    resCookie(res, user).status(200).json({...body});
}