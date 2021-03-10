import dotenv from 'dotenv';

dotenv.config()
const DB_password = process.env.DB_PASSWORD
const DB_userName = process.env.DB_USER_NAME

export const MongoDBUris = `mongodb+srv://${DB_userName}:${DB_password}@cluster0.hxs1t.mongodb.net/calcTest?retryWrites=true&w=majority`;



export const _PORT = 3007;

