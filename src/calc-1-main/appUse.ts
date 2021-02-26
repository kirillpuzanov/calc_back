import {Express, NextFunction, Request, Response} from 'express';
import {cookie} from './cookie';

export const appUse = (app: Express) => {
    cookie(app);

    // log middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log("Time: ", new Date().toString());
        console.log("-----", req.method, req.url, "params:", req.params);
        console.log("query:", req.query);
        console.log("body:", req.body);
        console.log("cookies:", req.cookies);
        // console.log("headers:", req.headers);
        // console.log("rawHeaders:", req.rawHeaders);
        next();
    });
};