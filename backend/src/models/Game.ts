import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'
dotenv.config()
const username = process.env.USERNAME
const password = process.env.PASSWORD
const dbName = process.env.DB_NAME

const uri = `mongodb+srv://${username}:${password}@math-racer-cluster.cdndn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri);


const { Schema, model } = mongoose;

const problemSchema = new Schema({
    question: String,
    answer: Number
})

const gameSchema = new Schema({
    level: Number,
    timeCreated: Date,
    problems: [problemSchema]
})

const gameModel = model('Game', gameSchema);

const game = new gameModel({
    level: 10
})
game.save((err: any) => {
    if (err) {
        console.log(err);
    }
})

export default gameModel;