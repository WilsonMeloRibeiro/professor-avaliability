const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.sendStatus(401);
    const token = authHeaders.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) res.sendStatus(403);
            req.user = decoded.UserInfo.name;
            req.roles = decoded.UserInfo.roles
            next();
        }
    );
}
module.exports = verifyJWT;