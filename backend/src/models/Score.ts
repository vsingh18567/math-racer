import mongoose from 'mongoose'
import dbConnect from '../dbConnect';
import { iGame } from './Game'
import { iUser } from './User'

dbConnect();

const { Schema, model } = mongoose;

export interface iScore extends Document {
    user: iUser,
    game: iGame,
    score: Number
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

