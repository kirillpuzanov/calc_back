import User, {IUser} from '../model/userModel';
import {Request, Response} from 'express';


export const getUsersDB = async (req: Request, res: Response) => {

    try{
        if (!req.query.search) {
            let users: IUser[] = await User.find()
            res.send(users)
        } else {
            // ищет по лубому совпадению символов приводя параметры поиска к нижнему регистру
            let users: IUser[] = await User.find({name: new RegExp((req.query.search as string).toLowerCase())})
            res.send(users)
        }
    }catch (e) {
        res.send(e)
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id
        let user = await User.findById(userId)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}