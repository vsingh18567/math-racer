import express from 'express';
import { IScore, Score } from '../models/Score';
import { Game , IGame, IProblem } from '../models/Game'
import generateProblems from './levels';
import crypto from 'crypto'
import e from 'express';

const router = express.Router();

router.get('/create', async (req, res) => {
    const {userID} = req.body;
    let status = true;
    let gid = ""
    while (status) {
        gid = crypto.randomBytes(3).toString('hex')
        const query = await Game.findOne({gID: gid})
        if (query == null) {
            status = false;
        }
        gid = gid.toUpperCase()
    }
    const newGame : IGame = await new Game({
        gID: gid,
        host: userID
    });
    newGame.save((err: any) => {
        if (err) {
            console.log(err)
            res.status(400).send({
                error: 'COULD NOT SAVE'
            })
            res.end()
        } else {
            res.send({
                gID: newGame.gID,
            })
        }

    })

})

router.post('/set', async (req, res) => {
    const {gID, level} = req.body;

    if (gID === undefined || level === undefined) {
        res.status(400).send({
            error: 'Missing Parameters'
        })
    }

    const query : IGame = await Game.findOne({gID});

    if (query == null) {
        res.status(406).send({
            error: 'NO SUCH GAME'
        })
        return
    }
    const num = parseInt(level, 10)
    query.level = num
    query.problems = generateProblems(num)
    query.save((err: any) => {
        if (err) {
            res.status(400).send({
                error: 'COULD NOT SAVE'
            })
        } else {
            res.send()
        }
    })

    // TODO: Set up Websockets stuff
})

router.get('/get', async (req, res) => {
    const {gID} = req.body

    const game : IGame = await Game.findOne({gID});
    if (game == null) {
        res.status(406).send({
            error: 'NO SUCH GAME'
        })
        return;
    }

    const scores : IScore[] = await Score.find({
        game: {_id : game._id}
    })


    res.send({
        gameInfo: game,
        scores: scores
    })
})

export default router