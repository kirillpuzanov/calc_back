import {Request, Response} from 'express';
import User, {IUser} from '../model/userModel';


export const updateUser = async (req: Request, res: Response) => {
    try {
        const updateUser: IUser = req.body
        const userId: string = req.body._id
        let user = await User.findByIdAndUpdate(userId, updateUser)
        res.send(user)
    } catch (err) {
        res.sendStatus(200)
    }
}
