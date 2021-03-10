import express from 'express';
import {addCharacteristicsCargo} from './controllers/addCharacteristicsCargo';
import {addPayment} from './controllers/addPayment';
import {findUserByToken} from '../../calc-1-main/halpers/findByTokken';
import {isWithPallet} from './controllers/pallet_noPallet';
import {palletParam} from './controllers/palletParam';
import {transports} from './controllers/transports';
import {placementCargo_totalValue} from './controllers/placementCargo_totalValue';


const payment = express.Router();

payment.post('/s_payment', findUserByToken(addPayment));
payment.put('/packing', findUserByToken(addCharacteristicsCargo));
payment.put('/withPallet', findUserByToken(isWithPallet));
payment.put('/palletParam', findUserByToken(palletParam));
payment.put('/placement', findUserByToken(placementCargo_totalValue));
payment.put('/transports', findUserByToken(transports));

export default payment

