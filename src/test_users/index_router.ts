import express from 'express'
import {addUser} from './controllers/addUser';
import {getUser, getUsersDB} from './controllers/getUsers';
import {deleteUser} from './controllers/deleteUser';
import {updateUser} from './controllers/updateUser';



const users = express.Router();

users.get('/', getUsersDB)
users.get('/:id', getUser);
users.post('/', addUser);
users.delete('/:id', deleteUser);
users.put('/', updateUser);

export default users