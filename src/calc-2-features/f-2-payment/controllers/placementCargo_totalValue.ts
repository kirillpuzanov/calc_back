import {Request, Response} from 'express';
import PaymentModel, {PackagingItemType, TotalCargoValueType} from '../model/payment-model';
import {successResult} from '../../../calc-1-main/halpers/statuses/success-result';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/statuses/error-result';
import {resCookie} from '../../../calc-1-main/cookie';
import {IUser} from '../../f-1-auth/user-model/user-model';


export const placementCargo_totalValue = async (req: Request, res: Response, user: IUser) => {
    const currentPaymentId: string = req.body.currentPaymentId
    const totalCargoValue: TotalCargoValueType = req.body.totalCargoValue
    const packagingCargo: PackagingItemType[] = req.body.packagingCargo
    if (!currentPaymentId || !totalCargoValue || !packagingCargo) {
        errorStatus400(res, 'incomplete data in the request', 404, {
            currentPaymentId,
            totalCargoValue,
            packagingCargo
        })
    }
    try {
        const updatePackagingCargo = await PaymentModel
            .findByIdAndUpdate({_id: currentPaymentId}, {totalCargoValue, packagingCargo}).exec()
        if (!updatePackagingCargo) errorStatus400(res, 'not updated, bad request...', 404, {
            currentPaymentId,
            totalCargoValue, packagingCargo
        })
        else {
            resCookie(res, user)
            successResult(res, 'update cargo(s) value success!', 200, {totalCargoValue, packagingCargo})
        }
    } catch (err) {
        errorStatus500(res, err, 'in addCharacteristicsCargo/updatePackagingCargo')
    }
}