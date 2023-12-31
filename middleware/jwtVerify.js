const jwt = require('jsonwebtoken');

const jwtVerify = (req, res, next)=>{
    const header = req.headers?.authorization
    if(!header) return res.status(401).json('Not authorized')
    const cookie = header.split(' ')[1];
    console.log('aa')
    console.log(cookie)
    jwt.verify(
        cookie,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) return res.status(401).json(err)
            req.email = decoded.userInfo.email
            req.roles = decoded.userInfo.roles
            next()
        }
    )
}
module.exports = jwtVerify;