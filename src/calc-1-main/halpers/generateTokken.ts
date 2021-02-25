import mongoose from 'mongoose';
import jsonwebtoken, {Secret} from 'jsonwebtoken';
import User from '../../calc-2-features/f-1-auth/user-model/user-model';


export const generateResetPasswordToken = async (userId: mongoose.Types.ObjectId) => {

    const resetPasswordToken = jsonwebtoken.sign({id: userId}, process.env.SECRET_KEY as Secret)
    await User.findByIdAndUpdate(
        userId,
        {resetPasswordToken, resetPasswordTokenDeathTime: Date.now() + (1000 * 60 * 10)}, // 10 min
        {new: true}
    ).exec();
    return resetPasswordToken;
};


export const updateGenerateToken = (userId: mongoose.Types.ObjectId, rememberMe: boolean): [string, number] => {

    const token = jsonwebtoken.sign({id: userId}, process.env.SECRET_KEY as string)
    const tokenDeathTime = rememberMe
        ? Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 days
        : Date.now() + (1000 * 60 * 60 * 3); // 3 hours

    return [token, tokenDeathTime]
}