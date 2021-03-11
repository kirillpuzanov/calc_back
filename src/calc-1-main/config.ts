import dotenv from 'dotenv';

export const DEV_VERSION = false

DEV_VERSION && dotenv.config()

const _DB_PASSWORD = process.env.DB_PASSWORD

export const MongoDBUris = `mongodb+srv://kirill:${_DB_PASSWORD}@cluster0.hxs1t.mongodb.net/calcTest?retryWrites=true&w=majority`;

export const _PORT = 3007;