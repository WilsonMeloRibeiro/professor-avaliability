const user = require('../model/user');

const logoutHandler = async (req, res)=>{
    if(!req.cookies?.jwt) return res.sendStatus(400)
    const cookie = req.cookies.jwt
    const foundUser = await user.findOne({refreshToken: cookie})
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly:true})
        return res.sendStatus(204)
    }
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    res.clearCookie('jwt', {httpOnly:true})
    return res.status(204).json(result);
}

module.exports = logoutHandler;