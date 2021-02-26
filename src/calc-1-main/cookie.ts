import cors from 'cors';
import cookieParser from 'cookie-parser';
import {Express, Response} from 'express';
import {IUser} from '../calc-2-features/f-1-auth/user-model/user-model';

export const cookie = (app: Express) => {
    const corsOptions = {credentials: true}
    app.use(cors(corsOptions));
    app.use(cookieParser());
};


export const cookieSettings = {sameSite: 'none' as const, secure: true};
export const resCookie = (res: Response, user: IUser) => {
    return res.cookie('token', user.token, {
        ...cookieSettings,
        expires: new Date(user.tokenDeathTime || 0),
    });
};