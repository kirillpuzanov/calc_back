import mongoose from 'mongoose';
import {MongoDBUris} from './config';
export async function startDB(){
    try {
        await mongoose.connect(MongoDBUris, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: false,
            useFindAndModify: true,
        })


        console.log('db connected successfully')
    } catch (e) {
        console.log(e)
    }
}