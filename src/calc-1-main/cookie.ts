import cors from 'cors';
import cookieParser from 'cookie-parser';
import {Express, NextFunction, Response} from 'express';
import {IUser} from '../calc-2-features/f-1-auth/user-model/user-model';

// export const cookieSettings = {sameSite: 'none' as const, secure: true}; если через  хероку

export const cookieSettings = {};
export const cookie = (app: Express) => {
    const corsOptions = {
        credentials: true,
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            console.log('origin: ', origin);
            callback(null, true); // everyone is allowed
        }
    };
    app.use(cors(corsOptions));
    app.use(cookieParser());
};


export const resCookie = (res: Response, user: IUser) => {
    return res.cookie('token', user.token, {
        ...cookieSettings,
        expires: new Date(user.tokenDeathTime || 0),
    });
};