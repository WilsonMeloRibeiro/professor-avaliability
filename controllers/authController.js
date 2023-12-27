const user = require('../model/user');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.sendStatus(400)
    const userFound = await user.findOne({ email: email })
    if(!userFound) return res.sendStatus(400)
    const match = await bcrypt.compare(password, userFound.password)
    const username = userFound.username
    console.log(match);
    if(match){
        const roles = Object.values(userFound.roles).filter(Boolean);
        const REFRESH_TOKEN = jwt.sign(
            {
                userInfo:{
                    roles: roles,
                    email: userFound.email
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'24h' }
        )
        const ACCESS_TOKEN = jwt.sign(
            {
                userInfo:{
                    roles: roles,
                    email: userFound.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1m'}
        )
        userFound.refreshToken = REFRESH_TOKEN
        const result = await userFound.save()
        console.log(result);
        res.cookie('jwt', REFRESH_TOKEN, {httpOnly:true, expiresIn: '24h'})
        res.status(200).json({ACCESS_TOKEN, roles, username })
    }
    else return res.sendStatus(403)
}

module.exports = handleLogin;