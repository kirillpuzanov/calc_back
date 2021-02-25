import {Request, Response} from 'express';
import PaymentModel, {PackagingItemType} from '../model/payment-model';
import {successResult} from '../../../calc-1-main/halpers/success-result';
import {errorStatus400, errorStatus500} from '../../../calc-1-main/halpers/error-result';


export const addCharacteristicsCargo = async (req: Request, res: Response) => {
    const searchIdPayment: string = req.body.searchIdPayment
    const newPackagingCargo: PackagingItemType[] = req.body.packagingCargo
    if (!searchIdPayment || !newPackagingCargo) {
        errorStatus400(res, 'incomplete data in the request', 404, newPackagingCargo)
    }
    try {
        const updatePackagingCargo = await PaymentModel
            .findByIdAndUpdate({_id: searchIdPayment}, {packagingCargo: newPackagingCargo})
        if (!updatePackagingCargo) errorStatus400(res, 'not updated, bad request...', 404, {searchIdPayment, newPackagingCargo})
        else successResult(res, 'update cargo(s) value success!', 200, newPackagingCargo)
    } catch (err) {
        errorStatus500(res, err,'in addCharacteristicsCargo/updatePackagingCargo')
    }
}
//test commit
