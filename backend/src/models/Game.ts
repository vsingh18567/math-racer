import mongoose, { Date, Document } from 'mongoose'
import dbConnect from '../dbConnect';

dbConnect();


const { Schema, model } = mongoose;

export interface iProblem extends Document {
    question: String,
    answer: Number
}

const problemSchema = new Schema({
    question: String,
    answer: Number
})

export interface iGame extends Document {
    level: Number,
    timeCreated: Date,
    problems: Array<iProblem>
}

const gameSchema = new Schema({
    level: Number,
    timeCreated: Date,
    problems: [problemSchema]
})

export const Game = model('Game', gameSchema);

// const game = new gameModel({
//     level: 10
// })
// game.save((err: any) => {
//     if (err) {
//         console.log(err);
//     }
// })
