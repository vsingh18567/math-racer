import mongoose from 'mongoose'

const { Schema, model } = mongoose;

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

const scoreModel = model('Score', scoreSchema);

export default scoreModel;