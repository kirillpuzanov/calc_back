import {Request, Response} from 'express';
import User from '../model/userModel';


export const addUser = async (req: Request, res: Response) => {
    let user = new User({name: req.body.name.toLowerCase()})
    await user.save()
    res.send(user)
}
