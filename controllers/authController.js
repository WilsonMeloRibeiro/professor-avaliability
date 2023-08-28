require('dotenv').config();
const fsPromisses = require('fs').promises;
const jwt = require('jsonwebtoken');
const path = require('path');
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { name, pwd } = req.body;
    if (!name || !pwd) return res.status(400).json({ 'message': 'nome e senha são requeridos' });
    const userFound = usersDB.users.find(Element => Element.name === name);
    if (!userFound) return res.sendStatus(401)
    const match = await bcrypt.compare(pwd, userFound.pwd);
    if (match) {
        const accessToken = jwt.sign(
            { 'name': userFound.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { 'name': userFound.name },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const otherUsers = usersDB.users.filter(Element => Element.name === userFound.name);
        const authUser = { ...userFound, refreshToken };
        usersDB.setUsers([...otherUsers, authUser]);
        await fsPromisses.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.send({ accessToken })
    } else {
        res.sendStatus(401)
    }
}
module.exports = { handleLogin };