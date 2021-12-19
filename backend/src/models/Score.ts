import mongoose from 'mongoose'
import dbConnect from '../dbConnect';
import { IGame } from './Game'
import { IUser } from './User'

dbConnect();

const { Schema, model } = mongoose;

export interface IScore extends mongoose.Document {
    user: IUser,
    game: IGame,
    score: number
}

const scoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    score: Number
})

export const Score = model('Score', scoreSchema);

