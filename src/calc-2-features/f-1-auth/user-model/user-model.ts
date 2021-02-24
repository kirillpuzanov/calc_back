import {Schema, Document, model} from 'mongoose';

export interface IUser extends Document {
    name: string
    _id: string
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    }
})
const UserCalc = model<IUser>('UserCalc', userSchema)
export default UserCalc