import {Request, Response} from 'express';
import PaymentModel, {TransportType} from '../model/payment-model';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {resCookie} from '../../../calc-1-main/cookie';
import {IUser} from '../../f-1-auth/user-model/user-model';


export const transports = async (req: Request, res: Response, user: IUser) => {
    const currentPaymentId: string = req.body.currentPaymentId
    const transports: TransportType[] = req.body.transports
    if (!currentPaymentId || !transports) {
        errorStatus400(res, 'incomplete data in the request', 404, {currentPaymentId, transports})
    }
    try {
        const updatePackagingCargo = await PaymentModel
            .findByIdAndUpdate({_id: currentPaymentId}, {transports}).exec()
        if (!updatePackagingCargo) errorStatus400(res, 'not updated, bad request...', 404, {
            currentPaymentId,
            transports
        })
        else {
            resCookie(res, user)
            successResult(res, 'update cargo(s) value success!', 200, transports)
        }
    } catch (err) {
        errorStatus500(res, err, 'in addCharacteristicsCargo/updatePackagingCargo')
    }
}