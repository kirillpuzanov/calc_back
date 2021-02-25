import {Express, Request, Response} from 'express';
import payment from '../calc-2-features/f-2-payment/index-payment';
import auth from '../calc-2-features/f-1-auth/index-auth';


export const routes = (app: Express) => {
//  app.use('/users', users)

    app.use('/auth', auth)
    app.use('/s_payment', payment)
    app.use('/packing', payment)

    // * '?' PNF 404
    app.use((req: Request, res: Response) => {
        console.log("Bad request, url: ", req.method, req.url);
        res.status(404).json({
            error: "bad url",
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        });
    });
};
