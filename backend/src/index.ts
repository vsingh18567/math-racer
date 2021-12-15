import express from 'express';
import { Sequelize } from 'sequelize';
import gameModel from './models/Game';
import authRouter from './routers/authRouter';

const app = express();
const port = 8000;


app.get('/', (req, res) => {
    res.send('Sup homie');
})

app.use('/auth', authRouter);

const game = new gameModel({
    level: 10
})
game.save((err: any) => {
    if (err) {
        console.log(err);
    }
})
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
})