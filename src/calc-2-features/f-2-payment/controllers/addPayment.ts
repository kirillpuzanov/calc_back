import {Request, Response} from 'express';
import PaymentModel, {IPayment, loadPlaceType} from '../model/payment-model';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';


export const addPayment = async (req: Request, res: Response) => {
    const loadPlace: loadPlaceType = req.body.loadPlace
    if ((loadPlace !== 'Грузовик') && (loadPlace !== 'Контейнер')) {
        errorStatus400(res, 'not create payment/add loadPlace, bad request...', 400, loadPlace)
    }
    try {
        const newPayment: IPayment | null = await PaymentModel.create({
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
            successResult(res, 'create payment/add loadPlace success!', 200, loadPlace);
        }
    } catch (err) {
        errorStatus500(res, err, 'in addPayment/newPayment')
    }
}
