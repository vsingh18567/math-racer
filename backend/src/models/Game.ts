import mongoose, { Date, Document } from 'mongoose'
import dbConnect from '../dbConnect';
import {IUser} from './User'
dbConnect();


const { Schema, model } = mongoose;

export interface IProblem {
    question: string,
    answer: number
}

const problemSchema = new Schema({
    question: String,
    answer: Number
})

export interface IGame extends Document {
    gID: string,
    host: IUser
    level: number,
    timeCreated: Date,
    problems: IProblem[]
}

const gameSchema = new Schema({
    gID: {
        type: String,
        unique: true
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level: Number,
    timeCreated: Date,
    problems: [problemSchema]
})

export const Game = model('Game', gameSchema);


