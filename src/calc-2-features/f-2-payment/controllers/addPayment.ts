import {Request, Response} from 'express';
import PaymentModel, {IPayment, loadPlaceType} from '../model/payment-model';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';
import {IUser} from '../../f-1-auth/user-model/user-model';
import {resCookie} from '../../../calc-1-main/cookie';


export const addPayment = async (req: Request, res: Response, user: IUser) => {
    const loadPlace: loadPlaceType = req.body.loadPlace
    if ((loadPlace !== 'Грузовик') && (loadPlace !== 'Контейнер')) {
        errorStatus400(res, 'not create payment/add loadPlace, bad request...', 400, loadPlace)
    }
    try {
        const newPayment: IPayment | null = await PaymentModel.create({
            user_id: user._id,
            user_name: user.name,
            loadPlace: loadPlace,
            packagingCargo: [],
            withPallet: '',
            totalCargoValue: {},
            palletParam: {},
            transports: [],
        })

        if (!newPayment) {
            errorStatus400(res, '11', 400, loadPlace)
        } else {
            resCookie(res, user)
            successResult(res, 'create payment/add loadPlace success!', 200, newPayment._doc);
        }
    } catch (err) {
        errorStatus500(res, err, 'in addPayment/newPayment')
    }
}


