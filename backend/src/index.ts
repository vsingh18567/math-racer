import bodyParser from 'body-parser';
import express from 'express';
import http from 'http'
import socketHandler from './socket'
import authRouter from './routers/authRouter';
import gameRouter from './routers/gameRouter'
import { Server } from 'socket.io'
const app = express();
const server = http.createServer()
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
    transports: ['websocket']
})
const port = 8000;
io.on('connection', (socket) => {
    socketHandler(socket)
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Sup homie');
})

app.use('/auth', authRouter);
app.use('/game', gameRouter);

server.listen(port, () => {
    console.log(`server started at localhost:${port}`);
})