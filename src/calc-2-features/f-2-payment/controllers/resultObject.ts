import {Request, Response} from 'express';
import PaymentModel, {PackagingItemType, TotalCargoValueType} from '../model/payment-model';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {resCookie} from '../../../calc-1-main/cookie';
import {IUser} from '../../f-1-auth/user-model/user-model';


export const resultObject = async (req: Request, res: Response, user: IUser) => {
    const {id} = req.query

    if (!id) {
        errorStatus400(res, 'incomplete data in the request', 404, {id})
    }
    try {
        const resultPayment = await PaymentModel
            .findById({_id: id}).exec()
        if (!resultPayment) errorStatus400(res, 'not find result payment', 404, {id})
        else {
            resCookie(res, user)
            successResult(res, 'update cargo(s) value success!', 200, {resultPayment})
        }
    } catch (err) {
        errorStatus500(res, err, 'in addCharacteristicsCargo/updatePackagingCargo')
    }
}