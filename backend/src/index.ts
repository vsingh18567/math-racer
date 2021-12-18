import bodyParser from 'body-parser';
import express from 'express';
import { Sequelize } from 'sequelize';
import authRouter from './routers/authRouter';

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Sup homie');
})

app.use('/auth', authRouter);


app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
})