import express from 'express';
import {login} from './controllers/login';
import {recoveryPassword} from './controllers/recoveryPassword';
import {setNewPassword} from './controllers/setNewPassword';
import {getMe} from './controllers/getMe';
import {updateUser} from './controllers/updateUser';
import {logout} from './controllers/logout';
import {findUserByToken} from '../../calc-1-main/halpers/findByTokken';
import {registration} from './controllers/registration';


const auth = express.Router();

auth.post('/login', login)//+
auth.post('/register', registration)//+
auth.post('/forgot', recoveryPassword) //+
auth.post('/newPass', setNewPassword) //+ нужно проверить через front
auth.get('/me', findUserByToken(getMe))//? + нужно проверить через front
auth.put('/me', findUserByToken(updateUser)) // --
auth.delete('/me', findUserByToken(logout)) //+? + нужно проверить через front


export default auth
