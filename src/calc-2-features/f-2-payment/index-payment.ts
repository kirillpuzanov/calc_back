import express from 'express';
import {addPayment} from './controllers/addCargo';
import {addCharacteristicsCargo} from './controllers/addCharacteristicsCargo';



const payment = express.Router();


payment.post('/', addPayment);
payment.put('/packing', addCharacteristicsCargo);


export default payment