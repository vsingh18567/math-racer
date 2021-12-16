import express from 'express';
import { Query } from 'mongoose';
import { User , iUser} from '../models/User'
import crypto from 'crypto'

const router = express.Router();


const hashPwd = (salt: string, pwd: string) => {
    var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(pwd).digest('hex')
}

router.get('/register', async (req, res) => {
    const {username, email, password} = req.body;
    
    let query : iUser = await User.findOne({
        username: username,
    })

    if (query == null) {
        res.status(406)
        res.send({
            error: 'USER EXISTS'
        })
    }

    var salt = crypto.randomBytes(128).toString('base64')
    const hashedPwd = hashPwd(salt, password);
    const newUser : iUser = new User({
        username: String,
        email: email,
        salt: salt,
        hashed_password: hashedPwd
    })

    newUser.save((err) => {
        console.log(err)
        res.status(400)
        res.send({
            error: 'COULD NOT SAVE'
        })
    });
    

    res.send('LOGGED IN');
})

router.get('/login')


export default router;