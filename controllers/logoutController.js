require('dotenv').config;
const jwt = require('jsonwebtoken');
const path = require('path');
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromisses = require('fs').promises;

const handleLogout = async (req, res) => {
    const cookies = req.cookies?.jwt;
    if (!cookies?.jwt) return res.sendStatus(204);

    const foundUser = usersDB.users.find(Element => Element.refreshToken === cookies)

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204)
    }

    const otherUsers = usersDB.users.filter(Element => Element.refreshToken !== cookies)
    const updatedUser = { ...foundUser, refreshToken: '' }
    usersDB.setUsers = ([...otherUsers, updatedUser])
    await fsPromisses.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    )

    res.clearCookie('jwt', { httpOnly: true});
    res.sendStatus(204);
}

module.exports = { handleLogout }