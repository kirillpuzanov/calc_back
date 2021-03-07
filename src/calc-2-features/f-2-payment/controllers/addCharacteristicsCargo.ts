import {Request, Response} from 'express';
import PaymentModel, {PackagingItemType} from '../model/payment-model';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {resCookie} from '../../../calc-1-main/cookie';
import {IUser} from '../../f-1-auth/user-model/user-model';


export const addCharacteristicsCargo = async (req: Request, res: Response,user: IUser) => {
    const currentPaymentId: string = req.body.currentPaymentId
    const newPackagingCargo: PackagingItemType[] = req.body.packagingCargo
    if (!currentPaymentId || !newPackagingCargo) {
        errorStatus400(res, 'incomplete data in the request', 404, {currentPaymentId,newPackagingCargo})
    }
    try {
        const updatePackagingCargo = await PaymentModel
            .findByIdAndUpdate({_id: currentPaymentId}, {packagingCargo: newPackagingCargo}).exec()
        if (!updatePackagingCargo) errorStatus400(res, 'not updated, bad request...', 404, {currentPaymentId, newPackagingCargo})
        else {
            resCookie(res, user)
            successResult(res, 'update cargo(s) value success!', 200, newPackagingCargo)
        }
    } catch (err) {
        errorStatus500(res, err,'in addCharacteristicsCargo/updatePackagingCargo')
    }
}
//test commit
