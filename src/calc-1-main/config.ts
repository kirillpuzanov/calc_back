import dotenv from 'dotenv';
// dotenv.config()
// export const DEV_VERSION = false
// export const MongoDBUris = `mongodb+srv://kirill:uyhixqhHNVl3FNfk@cluster0.hxs1t.mongodb.net/calcTest?retryWrites=true&w=majority`;
//
// export const _PORT = 3007;

const LOCAL_DB_NAME = process.env.DB_USER_NAME
const LOCAL_DB_PASSWORD = process.env.DB_PASSWORD

export const DEV_VERSION = false
export const MongoDBUris = `mongodb+srv://${LOCAL_DB_NAME}:${LOCAL_DB_PASSWORD}@cluster0.hxs1t.mongodb.net/calcTest?retryWrites=true&w=majority`;

export const _PORT = 3007;