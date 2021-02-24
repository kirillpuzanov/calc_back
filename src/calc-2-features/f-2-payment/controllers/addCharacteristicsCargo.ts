import {Request, Response} from 'express';
import PaymentModel, {PackagingItemType} from '../model/payment-model';


export const addCharacteristicsCargo = async (req: Request, res: Response) => {
    const searchIdPayment: string = req.body.searchIdPayment
    const newPackagingCargo: PackagingItemType[] = req.body.packagingCargo
    if (!searchIdPayment || !newPackagingCargo) res.sendStatus(404)
    try {
        await PaymentModel.findByIdAndUpdate({_id: searchIdPayment}, {packagingCargo: newPackagingCargo})
        res.send({message: 'update object_Payment success!'})
    } catch (err) {
        res.sendStatus(500)
    }
}
