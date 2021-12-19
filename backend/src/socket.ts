import { Socket } from 'socket.io'
import { Game, IGame } from './models/Game'
import { User, IUser } from './models/User'
import { IScore, Score } from './models/Score'
export default function (socket : Socket) : void {
    console.log('Client connected')
    socket.emit('connection', null)

    socket.on('join', async (gID, userID) => {
        socket.join(`game${gID}`)

        const score = new Score({
            user: userID,
            game: gID,
            score: 0
        })

        score.save()

        const user : IUser = await User.findById(userID)

        socket.to(`game${gID}`).emit('new-player', {
            userID: userID,
            username: user.username
        })
    })

    socket.on('game-start', async (gID, timeCreated) => {
        const game : IGame = await Game.findOne({
            gID: gID
        })
        game.timeCreated = timeCreated
        game.save()
        socket.to(`game${gID}`).emit('game-start', {timeCreated: timeCreated})
    })

    socket.on('score-update', async (gID, userID, updatedScore) => {
        const score : IScore = await Score.findOne({
            gID: gID,
            userID: userID
        })
        score.score = updatedScore;
        score.save()
        socket.to(`game${gID}`).emit('score-update', {
            userID: userID,
            score: updatedScore
        })
    })

    socket.on('end-game', async (gID) => {
        await Game.deleteOne({
            gID: gID
        })
        socket.to(`game${gID}`).emit('disconnect')
    })

    socket.on("disconnect", () => {})
}