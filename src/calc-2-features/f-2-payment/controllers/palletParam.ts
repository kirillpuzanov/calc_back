import {Request, Response} from 'express';
import PaymentModel from '../model/payment-model';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {resCookie} from '../../../calc-1-main/cookie';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';
import {IUser} from '../../f-1-auth/user-model/user-model';

export const palletParam = async (req: Request, res: Response, user: IUser) => {
    const {palletParameters, currentPaymentId} = req.body
    if (!palletParameters || !currentPaymentId) {
        errorStatus400(res, 'incomplete data in the request', 404, {palletParameters, currentPaymentId})
    }
    try {
        const updatePackagingCargo = await PaymentModel
            .findByIdAndUpdate({_id: currentPaymentId}, {palletParam: palletParameters}).exec()
        if (!updatePackagingCargo) errorStatus400(res, 'not updated, bad request.../withPallet/findByIdAndUpdate', 404, {
            palletParameters,
            currentPaymentId
        })
        else {
            resCookie(res, user)
            successResult(res, 'update cargo(s) value success!', 200, {palletParameters})
        }
    } catch (err) {
        errorStatus500(res, err, 'in withPallet/findByIdAndUpdate')
    }
}