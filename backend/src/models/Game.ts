import mongoose, { Date, Document } from 'mongoose'
import dbConnect from '../dbConnect';

dbConnect();


const { Schema, model } = mongoose;

export interface IProblem extends Document {
    question: string,
    answer: number
}

const problemSchema = new Schema({
    question: String,
    answer: Number
})

export interface IGame extends Document {
    level: number,
    timeCreated: Date,
    problems: IProblem[]
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
