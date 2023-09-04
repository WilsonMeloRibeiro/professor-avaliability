const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');
const fsPromisses = require('fs').promises;
const path = require('path');

const handleRegistration = async (req, res) => {
    const { name, pwd } = req.body;
    if (!name || !pwd) return res.status(400).json({ 'message': 'nome e senha são requeridos' });
    const conflict = usersDB.users.find(Element => Element.name === name);
    if (conflict) return res.sendStatus(409)
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {
            name: name,
            roles:{
                user: 200
            },
            pwd: hashedPwd
        }
        fsPromisses.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify([...usersDB.users, newUser])
        )
        return res.status(200).json(usersDB.users);
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }

}
module.exports = { handleRegistration }