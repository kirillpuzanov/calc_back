import {Request, Response} from 'express';
import {errorStatus400} from './statuses/error-result';

export const emailRegExp = /^[\w][\w-.]*@[\w-]+\.[a-z]{2,7}$/i;

export const emailValidator = (email: string): boolean => emailRegExp.test(email); // true - valid

export const passwordValidator = (password: string): boolean => password.length > 7; // true - valid

export const validateAuth = (req: Request, res: Response, inInfo: string): boolean => {
    const isEmailValid = emailValidator(req.body.email);
    const isPassValid = passwordValidator(req.body.password);

    if (!isEmailValid || !isPassValid) {
        errorStatus400(res, 'not valid email/password', 400,
            {passwordRegExp: 'Password must be more than 7 characters...'})
        return false;
    } else return true
};
