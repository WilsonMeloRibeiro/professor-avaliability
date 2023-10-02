const user = require('../model/user');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.sendStatus(400)
    const userFound = await user.findOne({ username: username })
    if(!userFound) return res.sendStatus(400)
    const match = await bcrypt.compare(password, userFound.password)
    console.log(match);
    if(match){
        const roles = Object.values(userFound.roles)
        const REFRESH_TOKEN = jwt.sign(
            {
                userInfo:{
                    roles: roles,
                    username: userFound.username
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'24h' }
        )
        const ACCESS_TOKEN = jwt.sign(
            {
                userInfo:{
                    roles: roles,
                    username: userFound.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1m'}
        )
        userFound.refreshToken = REFRESH_TOKEN
        const result = await userFound.save()
        console.log(result);
        res.cookie('jwt', REFRESH_TOKEN, {httpOnly:true, expiresIn: '24h'})
        res.status(200).json(ACCESS_TOKEN)
    }
    else return res.sendStatus(403)
}

module.exports = handleLogin;