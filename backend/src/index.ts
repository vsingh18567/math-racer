import bodyParser from 'body-parser';
import express from 'express';
import { Sequelize } from 'sequelize';
import authRouter from './routers/authRouter';
import gameRouter from './routers/gameRouter'
const app = express();
const port = 8000;


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Sup homie');
})

app.use('/auth', authRouter);
app.use('/game', gameRouter);

app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
})