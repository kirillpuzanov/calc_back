import {IUser} from '../user-model/user-model';
import {resCookie} from '../../../calc-1-main/cookie';
import {Request, Response} from "express";

export const getMe = (res: Response, req: Request,user: IUser) => {

    const body: any = {...user};

    delete body.password; // don't send password to the front
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;

    resCookie(res, user).status(200).json({...body});
}