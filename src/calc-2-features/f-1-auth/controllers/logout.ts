import {Request, Response} from "express";
import {IUser} from '../user-model/user-model';
import {cookieSettings} from '../../../calc-1-main/cookie';

export const logout = async (req: Request, res: Response) => {
    res.cookie('token', '', {
        ...cookieSettings,
        expires: new Date(0)
    }).status(200).json({info: 'logout success...'})
}