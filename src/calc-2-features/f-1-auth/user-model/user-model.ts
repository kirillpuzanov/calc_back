import mongoose, {Schema, Document, model} from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    rememberMe: boolean;
    isAdmin: boolean;

    name: string;
    verified: boolean;

    token?: string;
    tokenDeathTime?: number;
    resetPasswordToken?: string;
    resetPasswordTokenDeathTime?: number;

    created: Date;
    updated: Date;
    _doc: object
}


const userSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        rememberMe: {
            type: Boolean,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            required: true
        },
        token: {
            type: String,
        },
        tokenDeathTime: {
            type: Number,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordTokenDeathTime: {
            type: Number,
        },
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    }
);

userSchema.pre('save', async function (next) {
    const user = this as IUser
    if (!user.isModified('password')) {
        next();
    }
    user.password = await bcrypt.hash(user.password, 7);
});

const User = model<IUser>('User', userSchema)
export default User