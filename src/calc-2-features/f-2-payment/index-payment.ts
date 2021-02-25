import express from 'express';
import {addCharacteristicsCargo} from './controllers/addCharacteristicsCargo';
import {addPayment} from './controllers/addPayment';


const payment = express.Router();


payment.post('/', addPayment);
payment.put('/packing', addCharacteristicsCargo);


export default payment

