import mongoose, { Document } from 'mongoose'
import dbConnect from '../dbConnect';
dbConnect();

const { Schema, model } = mongoose;

export interface iUser extends Document {
    username: String,
    email: String,
    salt: String
    hashed_password: String
}

const userSchema = new Schema({
    username: String,
    email: String,
    salt: String,
    hashed_password: String
})


export const User = model('User', userSchema);

