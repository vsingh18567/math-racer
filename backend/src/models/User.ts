import mongoose, { Document } from 'mongoose'
import dbConnect from '../dbConnect';
dbConnect();

const { Schema, model } = mongoose;

export interface IUser extends Document {
    username: string,
    email: string,
    salt: string
    hashed_password: string
}

const userSchema = new Schema({
    username: String,
    email: String,
    salt: String,
    hashed_password: String
})


export const User = model('User', userSchema);

