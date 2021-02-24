import {Request, Response} from 'express';
import PaymentModel from '../model/payment-model';


export const addPayment = async (req: Request, res: Response) => {
    const loadPlace = req.body.loadPlace
    if (!loadPlace) res.sendStatus(404)
    try {
        const newPayment = await PaymentModel.create({
            loadPlace: loadPlace,
            packagingCargo: [],
            withPallet: '',
            totalCargoValue: {},
            palletParam: {},
            transports: [],
        })

        res.send({newPayment}).sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }
}
