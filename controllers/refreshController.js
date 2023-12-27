const jwt = require('jsonwebtoken');
const user = require('../model/user')

const handleRefresh = async (req, res) => {
    if (!req.cookies?.jwt) return res.sendStatus(403)
    const cookie = req.cookies.jwt
    const userFound = await user.findOne({ refreshToken: cookie })
    if (!userFound) return res.sendStatus(403)
    jwt.verify(
        cookie,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded)
            if (err || userFound.username !== decoded.userInfo.username) return res.sendStatus(403)
            const roles = Object.values(userFound.roles)
            const accessToken = jwt.sign(
                {
                    userInfo: {
                        username: userFound.username,
                        roles: roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            )
            return res.status(200).json(accessToken)
        },
    )
}

module.exports = handleRefresh