const handleRolesVerify = (...roles)=>{
    return (req, res, next)=>{
        if(!req?.roles) return res.sendStatus(401)
        const authorizedRoles = [...roles]
        console.log(req.roles)
        console.log(authorizedRoles)
        const result = req.roles.map(element => authorizedRoles.includes(element)).find(value => value==true)
        console.log(result)
        if(!result) return res.sendStatus(401)
        console.log('authorized')
        next()
    }
}
module.exports = handleRolesVerify