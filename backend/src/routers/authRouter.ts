import express from 'express';
import { Query } from 'mongoose';
import { User , IUser} from '../models/User'
import crypto from 'crypto'

const router = express.Router();


const hashPwd = (salt: string, pwd: string) => {
    const hmac = crypto.createHmac('sha256', salt);
    return hmac.update(pwd).digest('hex')
}

router.post('/register', async (req, res) => {

    const {username, email, password} = req.body;
    console.log(req.body)
    const query : IUser = await User.findOne({
        username,
    })

    if (query !== null) {
        res.status(406).send({
            error: 'USER EXISTS'
        })
        return;
    }

    const salt = crypto.randomBytes(128).toString('base64')
    const hashedPwd = hashPwd(salt, password);
    const newUser : IUser = new User({
        username,
        email,
        salt,
        hashed_password: hashedPwd
    })

    newUser.save((err: any) => {
        console.log(err)
        res.status(400).send({
            error: 'COULD NOT SAVE'
        })
        res.end()
    });

    res.status(200).send('LOGGED IN')
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const query : IUser = await User.findOne({
        username
    })

    if (query == null) {
        res.status(406).send({
            error: 'NO SUCH USER'
        })
        return
    }

    const salt = query.salt;
    const hashedPwd = hashPwd(salt.toString(), password);

    if (hashedPwd !== query.hashed_password) {
        res.status(406).send({
            error: 'WRONG PASSWORD'
        })
        return
    } else {
        res.status(200).send('GOOD CREDENTIALS')
    }
})

router.delete('/delete', (req, res) => {
    const {username} = req.body
    User.deleteOne({
        username
    }).then((value) => res.status(200).send('DELETED'))

})


export default router;