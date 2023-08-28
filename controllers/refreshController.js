require('dotenv').config;
const jwt = require('jsonwebtoken');
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const handleRefresh = (req, res) => {
    if (!req.cookies?.jwt) res.sendStatus(403);
    const cookie = req.cookies.jwt;
    const userFound = usersDB.users.find(Element => Element.refreshToken === cookie)
    if (!userFound) return res.sendStatus(403)
    jwt.verify(
        cookie,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || decoded.name !== userFound.name) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {'name': userFound.name},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({accessToken});
        }
    )
}

module.exports = {handleRefresh}