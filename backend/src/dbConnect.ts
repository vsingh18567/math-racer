import mongoose from 'mongoose'
import dotenv from 'dotenv'


export default function () {
    dotenv.config()
    const username = process.env.USERNAME
    const password = process.env.PASSWORD
    const dbName = process.env.DB_NAME

    const uri = `mongodb+srv://${username}:${password}@math-racer-cluster.cdndn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    mongoose.connect(uri);
}