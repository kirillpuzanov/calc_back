import { Request, Response} from 'express';
import User from '../model/userModel';


export const deleteUser = async (req: Request, res: Response) => {
    const userId: string = req.params.id
    await User.findByIdAndDelete(userId)
    res.sendStatus(204)
}
