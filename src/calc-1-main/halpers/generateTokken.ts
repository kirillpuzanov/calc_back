import mongoose from 'mongoose';
import User from '../../calc-2-features/f-1-auth/user-model/user-model';
import jwt,{Secret} from 'jsonwebtoken';



export const generateResetPasswordToken = async (userId: mongoose.Types.ObjectId) => {

    const resetPasswordToken = jwt.sign({id: userId}, process.env.SECRET_KEY as Secret)
    // const resetPasswordToken = v1()
    await User.findByIdAndUpdate(
        userId,
        {resetPasswordToken, resetPasswordTokenDeathTime: Date.now() + (1000 * 60 * 10)}, // 10 min
        {new: true}
    ).exec();
    return resetPasswordToken;
};


export const updateGenerateToken = (userId: mongoose.Types.ObjectId, rememberMe: boolean): [string, number] => {

    const token = jwt.sign({id: userId}, process.env.SECRET_KEY as string)
    // const token = v1();
    const tokenDeathTime = rememberMe
        ? Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 days
        : Date.now() + (1000 * 60 * 60 * 3); // 3 hours

    return [token, tokenDeathTime]
}