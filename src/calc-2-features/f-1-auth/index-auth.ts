import express from 'express';
import {login} from './controllers/login';
import {registerNewUser} from './controllers/registerNewUser';
import {recoveryPassword} from './controllers/recoveryPassword';
import {setNewPassword} from './controllers/setNewPassword';
import {getMe} from './controllers/getMe';
import {updateUser} from './controllers/updateUser';
import {logout} from './controllers/logout';
import {findUserByToken} from '../../calc-1-main/halpers/findByTokken';


const auth = express.Router();

auth.post('/login', login)
auth.post('/register', registerNewUser)
auth.post('/forgot', recoveryPassword)
auth.post('/set_new_pass', setNewPassword)
auth.post('/me', findUserByToken, getMe)
auth.put('/me', findUserByToken, updateUser)
auth.delete('/me', findUserByToken, logout)


export default auth
